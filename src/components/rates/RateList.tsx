import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import { Delete } from '@material-ui/icons'
import React, { PureComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { IRate, IState } from '../../store/state'
import { Transactions } from '../home/Home'
import Item from './list/Item'
import SubHeader from './list/SubHeader'

interface IProps {
    readonly?: boolean
    title?: string
    action?: ReactNode
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

export const ListHeader = styled.div`
    display: flex;
    background-color: #FAFAFA;
    flex-direction: row;
    padding: 0 18px;
`

class RateList extends PureComponent<IProps> {
    public getQuotation(rate: IRate) {
        const base = 1 / this.props.quotation[rate.base] || 1

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

    public renderEmpty() {
        return (
            <Typography
                align='center'
                variant='h6'
                style={ {
                    backgroundColor: '#FAFAFA',
                    padding: '18px 0'
                } }>
                There is no rate do display
            </Typography>
        )
    }

    public renderList(data: IRate[]) {
        const { refreshing } = this.props

        if (refreshing) {
            return this.renderLoading()
        }

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
        const {
            rates = [],
            base,
            target,
            title = 'Your rates'
        } = this.props

        const equals = (rate: IRate) =>
            rate.base === base || rate.base === target
                || rate.target === base || rate.target === target

        const data = this.props.readonly
            ? rates.filter(equals)
            : rates

        return (
            <Transactions>
                <List
                    style={ { padding: '0px' } }
                    subheader={
                        <ListHeader>
                            <SubHeader title={ title } />
                            { this.props.action }
                        </ListHeader>
                    }>
                    {
                        data.length === 0
                            ? this.renderEmpty()
                            : this.renderList(data)
                    }
                </List>
            </Transactions>
        )
    }
}

export default RateList
