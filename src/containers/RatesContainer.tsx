import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { updateCurrency } from '../actions/exchange'
import Main from '../components/layout/Main'
import Rates from '../components/rates/Rates'
import { IState } from '../store/state'
import { REFRESH_RATE } from './ExchangeContainer'

export interface IProps extends RouteComponentProps<{}> {
    base: IState['exchange']['base']
    target: IState['exchange']['target']
    refreshing: IState['quotation']['refreshing']
    quotation: IState['quotation']['current']
    rates: IState['rates']
    lastUpdate: IState['quotation']['lastUpdate']
    onUpdateCurrency(refresh?: boolean): void
}

class RatesContainer extends Component<IProps> {
    public componentDidMount() {
        this.updateCurrency()
    }

    public updateCurrency() {
        this.props.onUpdateCurrency(true)
        setInterval(this.props.onUpdateCurrency, REFRESH_RATE)
    }

    public render() {
        return (
            <Main>
                <Rates { ...this.props } />
            </Main>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    base: state.exchange.base,
    lastUpdate: state.quotation.lastUpdate,
    quotation: state.quotation.current,
    rates: state.rates,
    refreshing: state.quotation.refreshing,
    target: state.exchange.target
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onUpdateCurrency: (refresh?: boolean) => {
        dispatch(updateCurrency(refresh))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer)
