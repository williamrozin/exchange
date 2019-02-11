import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
    setBaseCurrency,
    setCurrencyWeight,
    setTargetCurrency,
    TCurrency,
    updateCurrency
} from '../actions/exchange'
import Exchange from '../components/exchange/Exchange'
import Main from '../components/layout/Main'
import { IState } from '../store/state'

interface IProps {
    base: TCurrency
    target: TCurrency
    weight: number
    onSetBaseCurrency(value: string): void
    onSetTargetCurrency(value: string): void
    onSetCurrencyWeight(value: number): void
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
    target: state.target,
    weight: state.weight,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onSetBaseCurrency: (value: string) => {
        dispatch(setBaseCurrency(value))
    },
    onSetCurrencyWeight: (value: number) => {
        dispatch(setCurrencyWeight(value))
    },
    onSetTargetCurrency: (value: string) => {
        dispatch(setTargetCurrency(value))
    },
    onUpdateCurrency: () => {
        dispatch(updateCurrency())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer)
