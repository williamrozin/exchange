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
    base: IState['base']
    target: IState['target']
    refreshing: IState['refreshing']
    quotation: IState['quotation']
    rates: IState['rates']
    lastUpdate: IState['lastUpdate']
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
    base: state.base,
    lastUpdate: state.lastUpdate,
    quotation: state.quotation,
    rates: state.rates,
    refreshing: state.refreshing,
    target: state.target
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onUpdateCurrency: (refresh?: boolean) => {
        dispatch(updateCurrency(refresh))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer)
