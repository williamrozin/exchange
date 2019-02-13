import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { updateQuotation } from '../actions/quotation-actions'
import { addRate, removeRate } from '../actions/rates-actions'
import Main from '../components/layout/Main'
import Rates from '../components/rates/Rates'
import { IRate, IState } from '../store/state'
import { REFRESH_RATE } from './ExchangeContainer'

export interface IProps extends RouteComponentProps<{}> {
    base: IState['exchange']['base']
    target: IState['exchange']['target']
    refreshing: IState['quotation']['refreshing']
    quotation: IState['quotation']['current']
    rates: IState['rates']
    lastUpdate: IState['quotation']['lastUpdate']
    onAddRate(rate: IRate): void
    onRemoveRate(rate: IRate): void
    onUpdateQuotation(refresh?: boolean): void
}

class RatesContainer extends Component<IProps> {
    public componentDidMount() {
        this.updateQuotation()
    }

    public updateQuotation() {
        this.props.onUpdateQuotation(true)
        setInterval(this.props.onUpdateQuotation, REFRESH_RATE)
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
    onAddRate: (rate: IRate) => {
        dispatch(addRate(rate))
    },
    onRemoveRate: (rate: IRate) => {
        dispatch(removeRate(rate))
    },
    onUpdateQuotation: (refresh?: boolean) => {
        dispatch(updateQuotation(refresh))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RatesContainer)
