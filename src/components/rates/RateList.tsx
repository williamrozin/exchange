import {
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { Component } from 'react'
import styled from 'styled-components'
import { IRate, IState } from '../../store/state'
import { Transactions } from '../home/Home'

interface IProps {
    readonly?: boolean
    title?: string
    rates: IState['rates']
    base: IState['base']
    target: IState['target']
    quotation: IState['quotation']
    refreshing: IState['refreshing']
}

const LoadingWrapper = styled.div`
    flex: 1;
    padding: 45px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

class RateList extends Component<IProps> {
    public getQuotation(rate: IRate) {
        const base = 1 / this.props.quotation[rate.base]

        return (base * this.props.quotation[rate.target]).toLocaleString('en', {
            currency: rate.target,
            style: 'currency'
        })
    }

    public renderLoading() {
        return (
            <LoadingWrapper>
                <CircularProgress size={ 48 } />
            </LoadingWrapper>
        )
    }

    public render() {
        const {
            rates = [],
            base,
            target
        } = this.props

        const data = this.props.readonly
            ? rates.filter((rate) =>
                rate.base === base || rate.base === target
                || rate.target === base || rate.target === target
            )
            : rates

        if (this.props.refreshing) {
            return this.renderLoading()
        }

        return (
            <Transactions>
                <List
                    style={ { padding: '0px' } }
                    subheader={
                        <ListSubheader
                            style={ {
                                backgroundColor: '#FAFAFA',
                                padding: '0 18px'
                            } }>
                            { this.props.title || 'Your rates' }
                        </ListSubheader>
                    }>
                    {
                        data.map((rate, index: number) =>
                            <ListItem
                                button
                                style={ {
                                    backgroundColor: index % 2 === 0
                                        ? '#EEEEEE'
                                        : '#F5F5F5'
                                } }
                                key={ index }>
                                <ListItemText
                                    primary={ `1 ${rate.base} - $ ${this.getQuotation(rate)} ${rate.target}` }
                                />
                                {
                                    !this.props.readonly && (
                                        <ListItemSecondaryAction>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )
                                }
                            </ListItem>
                        )
                    }
                </List>
            </Transactions>
        )
    }
}

export default RateList
