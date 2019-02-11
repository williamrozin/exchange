import { Button, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Autorenew } from '@material-ui/icons'
import { distanceInWordsToNow } from 'date-fns'
import React, { Component } from 'react'
import { IProps } from '../../containers/HomeContainer'
import { ITransaction } from '../../store/state'

class Home extends Component<IProps> {
    public formatTransaction = (transaction: ITransaction) => {
        const { from, to } = transaction
        return `Exchanged from ${from.currency} (${to.amount})`
    }

    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public renderTransactions() {
        return this.props.transactions.map((transaction: ITransaction) =>
            <ListItem
                button
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

    public render() {
        return (
            <>
                { this.renderTransactions() }
                <Button onClick={ this.handleGoTo('/exchange') }>
                    Exchange
                </Button>
            </>
        )
    }
}

export default Home
