import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
    exchange,
    setBaseCurrency,
    setCurrencyQuotation,
    setTargetCurrency,
    TCurrency,
    updateCurrency
} from '../actions/exchange'
import Exchange from '../components/exchange/Exchange'
import Main from '../components/layout/Main'
import { IHistory, IState } from '../store/state'

export interface IProps {
    base: TCurrency
    history: IHistory[]
    target: TCurrency
    wallet: IState['wallet']
    quotation: number
    onExchange(history: IHistory): void
    onSetBaseCurrency(value: string): void
    onSetTargetCurrency(value: string): void
    onSetCurrencyQuotation(value: number): void
    onUpdateCurrency(): void
}

const REFRESH_RATE = 100 * 10 * 10 // 100ms * 10 * 10 = 10s

class ExchangeContainer extends Component<IProps> {
    public componentDidMount() {
        this.updateCurrency()
    }

    public updateCurrency() {
        this.props.onUpdateCurrency()
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
    history: state.history,
    quotation: state.quotation,
    target: state.target,
    wallet: state.wallet
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onExchange: (history: IHistory) => {
        dispatch(exchange(history))
    },
    onSetBaseCurrency: (value: string) => {
        dispatch(setBaseCurrency(value))
    },
    onSetCurrencyQuotation: (value: number) => {
        dispatch(setCurrencyQuotation(value))
    },
    onSetTargetCurrency: (value: string) => {
        dispatch(setTargetCurrency(value))
    },
    onUpdateCurrency: () => {
        dispatch(updateCurrency())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer)
