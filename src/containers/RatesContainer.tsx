import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import Main from '../components/layout/Main'
import Rates from '../components/rates/Rates'

class RatesContainer extends Component<RouteComponentProps<{}>> {
    public render() {
        return (
            <Main>
                <Rates { ...this.props } />
            </Main>
        )
    }
}

export default RatesContainer
