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
import Home from '../components/home/Home'
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

class HomeContainer extends Component<IProps> {
    public componentDidMount() {
        this.updateCurrency()
    }

    public updateCurrency() {
        this.props.onUpdateCurrency()
        setInterval(this.props.onUpdateCurrency, 1000)
    }
    public render() {
        return <Home { ...this.props } />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
