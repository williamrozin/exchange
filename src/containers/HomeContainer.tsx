import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { setBaseCurrency } from '../actions/exchange-actions'
import { updateQuotation } from '../actions/quotation-actions'
import Home from '../components/home/Home'
import Main from '../components/layout/Main'
import { IState, ITransaction } from '../store/state'

export interface IProps extends RouteComponentProps<{}> {
    transactions: ITransaction[]
    wallet: IState['wallet']
    base: IState['exchange']['base']
    error: IState['quotation']['error']
    onSetBaseCurrency(value: string): void
    onUpdateQuotation(refresh?: boolean): void
}

class ExchangeContainer extends Component<IProps> {
    public render() {
        return (
            <Main
                error={ this.props.error }
                onUpdateQuotation={ this.props.onUpdateQuotation }>
                <Home { ...this.props } />
            </Main>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    base: state.exchange.base,
    error: state.quotation.error,
    transactions: state.transactions,
    wallet: state.wallet
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onSetBaseCurrency: (value: IState['exchange']['base']) => {
        dispatch(setBaseCurrency(value))
    },
    onUpdateQuotation: (refresh?: boolean) => {
        dispatch(updateQuotation(refresh))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeContainer)
