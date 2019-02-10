import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Home from '../components/home/Home'
import {
    SET_BASE_CURRENCY,
    SET_CURRENCY_WEIGHT,
    SET_TARGET_CURRENCY,
} from '../constants/action-types'

interface IProps {
    base: string
    target: string
    weight: number
    onSetBaseCurrency(value: string): void
    onSetTargetCurrency(value: string): void
    onSetCurrencyWeight(value: number): void
}

class HomeContainer extends Component<IProps> {
    public render() {
        return <Home { ...this.props } />
    }
}

const mapStateToProps = (state: { base: string, target: string, weight: number }) => ({
    base: state.base,
    target: state.target,
    weight: state.weight,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetBaseCurrency: (value: string) => {
        dispatch({ type: SET_BASE_CURRENCY, value })
    },
    onSetCurrencyWeight: (value: number) => {
        dispatch({ type: SET_CURRENCY_WEIGHT, value })
    },
    onSetTargetCurrency: (value: string) => {
        dispatch({ type: SET_TARGET_CURRENCY, value })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
