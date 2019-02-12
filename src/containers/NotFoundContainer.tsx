import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import Main from '../components/layout/Main'
import NotFound from '../components/not-found/NotFound'

class NotFoundContainer extends Component<RouteComponentProps<{}>> {
    public render() {
        return (
            <Main>
                <NotFound { ...this.props } />
            </Main>
        )
    }
}

export default NotFoundContainer
