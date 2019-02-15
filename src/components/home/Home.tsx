import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { Autorenew } from '@material-ui/icons'
import { distanceInWordsToNow } from 'date-fns'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { TCurrency } from '../../actions/quotation-actions'
import { ALL_CURRENCIES, CURRENCIES } from '../../constants/currencies'
import { IProps } from '../../containers/HomeContainer'
import { ITransaction } from '../../store/state'
import { Content, CURRENCY_OPTIONS } from '../exchange/Exchange'
import Tabs from '../exchange/tabs/Tabs'
import Item from '../rates/list/Item'
import SubHeader from '../rates/list/SubHeader'
import { ListHeader } from '../rates/RateList'

interface IAction {
    fullWidth?: boolean
}

const Abstract = styled.div`
    padding: 18px;
`

export const Transactions = styled.div`
    background-color: #E0E0E0;
`

export const Action = styled.div<IAction>`
    padding: 0 18px 18px;
    display: grid;
    grid-template-columns: ${(props) => props.fullWidth
        ? 'auto'
        : '1fr 1fr'
    };
    grid-gap: 18px;
`

const byTimestamp = (first: ITransaction, second: ITransaction) =>
    first.timestamp < second.timestamp
        ? 1
        : -1

class Home extends PureComponent<IProps> {
    public formatTransaction = (transaction: ITransaction) => {
        const { from, to } = transaction
        const fromAmount = from.amount.toLocaleString('en', {
            currency: from.currency,
            style: 'currency'
        })

        const toAmount = to.amount.toLocaleString('en', {
            currency: to.currency,
            style: 'currency'
        })

        const labelFrom = `${from.currency} (${fromAmount})`
        const labelTo = `${to.currency} (${toAmount})`

        return `Exchanged from ${labelFrom} to ${labelTo}`
    }

    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public handleChangeSelected = (selected: TCurrency) => {
        this.props.onSetBaseCurrency(selected)
    }

    public renderTab = (currency: TCurrency) => {
        const { wallet } = this.props
        const pounds = wallet[currency].toLocaleString('en', {
            currency,
            ...CURRENCY_OPTIONS
        })

        const { label } = ALL_CURRENCIES.find((item) => item.value === currency)

        return (
            <Abstract key={ currency }>
                <Typography
                    gutterBottom
                    variant='h3'
                    color='primary'
                    align='center'>
                    { pounds }
                </Typography>
                <Typography
                    align='center'
                    variant='h6'>
                    { currency } - { label }
                </Typography>
            </Abstract>
        )
    }

    public renderTransactions() {
        const transactions = this.props.transactions
            .sort(byTimestamp)

        return (
            <Transactions>
                <List
                    style={ { padding: '0px' } }
                    subheader={
                        <ListHeader>
                            <SubHeader title='Last transactions' />
                        </ListHeader>
                    }>
                    {
                        transactions.map((transaction: ITransaction, index: number) =>
                            <Item
                                index={ index }
                                key={ transaction.timestamp }>
                                <ListItemIcon>
                                    <Autorenew />
                                </ListItemIcon>
                                <ListItemText
                                    primary={ this.formatTransaction(transaction) }
                                    secondary={ distanceInWordsToNow(transaction.timestamp) }
                                />
                            </Item>
                        )
                    }
                </List>
            </Transactions>
        )
    }

    public renderPocket() {
        return (
            <>
                <Typography
                    align='center'
                    variant='h5'
                    color='textSecondary'
                    style={ { paddingTop: '18px' } }>
                    Your pockets
                </Typography>
                <Tabs
                    options={ CURRENCIES }
                    selected={ this.props.base }
                    renderTab={ this.renderTab }
                    onChangeTab={ this.handleChangeSelected }
                />
            </>
        )
    }

    public renderAction() {
        return (
            <Action fullWidth>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={ this.handleGoTo('/exchange') }>
                    Exchange
                </Button>
            </Action>
        )
    }

    public render() {
        return (
            <>
                <Typography
                    variant='h5'
                    color='textSecondary'
                    style={ { paddingBottom: '18px' } }>
                    Welcome back, William!
                </Typography>
                <Content>
                    { this.renderPocket() }
                    { this.renderAction() }
                    { this.renderTransactions() }
                </Content>
            </>
        )
    }
}

export default Home
