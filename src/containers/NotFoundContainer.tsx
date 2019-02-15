import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { updateQuotation } from '../actions/quotation-actions'
import Main from '../components/layout/Main'
import NotFound from '../components/not-found/NotFound'
import { IState } from '../store/state'

interface IProps extends RouteComponentProps<{}> {
    error: IState['quotation']['error']
    onUpdateQuotation(refresh?: boolean): void
}

class NotFoundContainer extends Component<IProps> {
    public render() {
        return (
            <Main
                error={ this.props.error }
                onUpdateQuotation={ this.props.onUpdateQuotation }>
                <NotFound { ...this.props } />
            </Main>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    error: state.quotation.error
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IState, {}, AnyAction>) => ({
    onUpdateQuotation: (refresh?: boolean) => {
        dispatch(updateQuotation(refresh))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer)
