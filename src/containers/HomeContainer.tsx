import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import Home from '../components/home/Home'
import Main from '../components/layout/Main'
import { IState, ITransaction } from '../store/state'

export interface IProps extends RouteComponentProps<{}> {
    transactions: ITransaction[]
    wallet: IState['wallet']
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
    transactions: state.transactions,
    wallet: state.wallet
})

export default connect(mapStateToProps)(ExchangeContainer)
