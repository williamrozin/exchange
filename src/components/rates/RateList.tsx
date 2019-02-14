import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { Delete } from '@material-ui/icons'
import React, { Component } from 'react'
import styled from 'styled-components'
import { IRate, IState } from '../../store/state'
import { Transactions } from '../home/Home'
import Item from './list/Item'
import SubHeader from './list/SubHeader'

interface IProps {
    readonly?: boolean
    title?: string
    rates: IState['rates']
    base: IState['exchange']['base']
    target: IState['exchange']['target']
    quotation: IState['quotation']['current']
    refreshing: IState['quotation']['refreshing']
    onRemoveRate?(rate: IRate): void
}

const LoadingWrapper = styled.div`
    flex: 1;
    padding: 12px 0 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FAFAFA;
`

class RateList extends Component<IProps> {
    public getQuotation(rate: IRate) {
        const base = 1 / this.props.quotation[rate.base]

        return (base * this.props.quotation[rate.target]).toLocaleString('en', {
            currency: rate.target,
            style: 'currency'
        })
    }

    public handleRemove = (rate: IRate) => () => {
        if (this.props.onRemoveRate) {
            this.props.onRemoveRate(rate)
        }
    }

    public renderLoading() {
        return (
            <LoadingWrapper>
                <CircularProgress size={ 48 } />
            </LoadingWrapper>
        )
    }

    public renderList() {
        const {
            rates = [],
            base,
            target,
            refreshing
        } = this.props

        if (refreshing) {
            return this.renderLoading()
        }

        const equals = (rate: IRate) =>
            rate.base === base || rate.base === target
                || rate.target === base || rate.target === target

        const data = this.props.readonly
            ? rates.filter(equals)
            : rates

        const getLabelFor = (rate: IRate) =>
            `1 ${rate.base} - ${this.getQuotation(rate)} ${rate.target}`

        return data.map((rate, index: number) =>
            <Item
                index={ index }
                key={ rate.base + rate.target }>
                <ListItemText primary={ getLabelFor(rate) } />
                {
                    !this.props.readonly && (
                        <ListItemSecondaryAction>
                            <IconButton onClick={ this.handleRemove(rate) }>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    )
                }
            </Item>
        )
    }

    public render() {
        const { title = 'Your rates' } = this.props

        return (
            <Transactions>
                <List
                    style={ { padding: '0px' } }
                    subheader={ <SubHeader title={ title } /> }>
                    { this.renderList() }
                </List>
            </Transactions>
        )
    }
}

export default RateList
