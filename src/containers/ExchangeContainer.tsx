import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
    exchange,
    setBaseCurrency,
    setTargetCurrency,
    updateCurrency
} from '../actions/exchange'
import Exchange from '../components/exchange/Exchange'
import Main from '../components/layout/Main'
import { IState, ITransaction } from '../store/state'

export interface IProps extends RouteComponentProps<{}> {
    base: IState['base']
    transactions: IState['transactions']
    target: IState['target']
    wallet: IState['wallet']
    refreshing: IState['refreshing']
    quotation: IState['quotation']
    rates: IState['rates']
    lastUpdate: IState['lastUpdate']
    onExchange(transactions: ITransaction): void
    onSetBaseCurrency(value: string): void
    onSetTargetCurrency(value: string): void
    onUpdateCurrency(refresh?: boolean): void
}

export const REFRESH_RATE = 100 * 10 * 10 // 100ms * 10 * 10 = 10s

class ExchangeContainer extends Component<IProps> {
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
                <Exchange { ...this.props } />
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
    target: state.target,
    transactions: state.transactions,
    wallet: state.wallet
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onExchange: (transactions: ITransaction) => {
        dispatch(exchange(transactions))
    },
    onSetBaseCurrency: (value: string) => {
        dispatch(setBaseCurrency(value))
    },
    onSetTargetCurrency: (value: string) => {
        dispatch(setTargetCurrency(value))
    },
    onUpdateCurrency: (refresh?: boolean) => {
        dispatch(updateCurrency(refresh))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer)
