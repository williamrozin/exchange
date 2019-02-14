import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { setBaseCurrency } from '../actions/exchange-actions'
import Home from '../components/home/Home'
import Main from '../components/layout/Main'
import { IState, ITransaction } from '../store/state'

export interface IProps extends RouteComponentProps<{}> {
    transactions: ITransaction[]
    wallet: IState['wallet']
    base: IState['exchange']['base']
    onSetBaseCurrency(value: string): void
}

class ExchangeContainer extends Component<IProps> {
    public render() {
        return (
            <Main>
                <Home { ...this.props } />
            </Main>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    base: state.exchange.base,
    transactions: state.transactions,
    wallet: state.wallet
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onSetBaseCurrency: (value: IState['exchange']['base']) => {
        dispatch(setBaseCurrency(value))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer)
