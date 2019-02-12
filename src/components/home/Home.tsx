import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import { Autorenew } from '@material-ui/icons'
import { distanceInWordsToNow } from 'date-fns'
import React, { Component } from 'react'
import styled from 'styled-components'
import { TCurrency } from '../../actions/exchange'
import { IProps } from '../../containers/HomeContainer'
import { ITransaction } from '../../store/state'
import { CURRENCIES, CURRENCY_OPTIONS } from '../exchange/Exchange'
import Tabs from '../exchange/tabs/Tabs'

interface IState {
    selected: TCurrency
}

interface IAction {
    fullWidth?: boolean
}

const Abstract = styled.div`
    padding: 24px;
`

const Transactions = styled.div`
    background-color: #E0E0E0;
`

const Container = styled.div`
    border: 1px solid silver;
`

export const Action = styled.div<IAction>`
    padding: 0 24px 24px;
    background-color: #FAFAFA;
    display: grid;
    grid-template-columns: ${(props) => props.fullWidth
        ? 'auto'
        : '1fr 1fr'
    };
    grid-gap: 24px;
`

const byTimestamp = (first: ITransaction, second: ITransaction) =>
    first.timestamp < second.timestamp
        ? 1
        : -1

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { selected: 'GBP' }
    }

    public formatTransaction = (transaction: ITransaction) => {
        const { from, to } = transaction
        return `Exchanged from ${from.currency} (${to.amount})`
    }

    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public handleChangeSelected = (selected: TCurrency) => {
        this.setState({ selected })
    }

    public renderTab = (currency: TCurrency) => {
        const { wallet } = this.props
        const pounds = wallet[currency].toLocaleString('en', {
            currency,
            ...CURRENCY_OPTIONS
        })

        const currencies: { [keys in TCurrency]: string } = {
            BRL: 'Brazilian real',
            EUR: 'Euro',
            GBP: 'British Pound',
            USD: 'American Dollar'
        }

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
                    { currency } - { currencies[currency] }
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
                        <ListSubheader
                            style={ {
                                backgroundColor: '#FAFAFA',
                                padding: '0 24px'
                            } }>
                            Last transactions
                        </ListSubheader>
                    }>
                    {
                        transactions.map((transaction: ITransaction, index: number) =>
                            <ListItem
                                button
                                style={ {
                                    backgroundColor: index % 2 === 0
                                        ? '#EEEEEE'
                                        : '#F5F5F5'
                                } }
                                key={ transaction.timestamp }>
                                <ListItemIcon>
                                    <Autorenew />
                                </ListItemIcon>
                                <ListItemText
                                    primary={ this.formatTransaction(transaction) }
                                    secondary={ distanceInWordsToNow(transaction.timestamp) }
                                />
                            </ListItem>
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
                    style={ { backgroundColor: '#FAFAFA', paddingTop: '24px' } }>
                    Your pockets
                </Typography>
                <Tabs
                    options={ CURRENCIES }
                    selected={ this.state.selected }
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
                    style={ { paddingBottom: '24px' } }>
                    Welcome back, William!
                </Typography>
                <Container>
                    { this.renderPocket() }
                    { this.renderAction() }
                    { this.renderTransactions() }
                </Container>
            </>
        )
    }
}

export default Home
