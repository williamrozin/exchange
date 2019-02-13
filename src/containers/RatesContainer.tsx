import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import Main from '../components/layout/Main'
import Rates from '../components/rates/Rates'
import { IState } from '../store/state'

export interface IProps extends RouteComponentProps<{}> {
    base: IState['base']
    target: IState['target']
    refreshing: IState['refreshing']
    quotation: IState['quotation']
    rates: IState['rates']
}

class RatesContainer extends Component<IProps> {
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
    quotation: state.quotation,
    rates: state.rates,
    refreshing: state.refreshing,
    target: state.target
})

export default connect(mapStateToProps)(RatesContainer)
