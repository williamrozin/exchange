import {
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { Component } from 'react'
import { Transactions } from '../home/Home'

interface IProps {
    title?: string
}

class RateList extends Component<IProps> {
    public render() {
        const rates: string[] = ['', '', '', '']

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
                        rates.map((_, index: number) =>
                            <ListItem
                                button
                                style={ {
                                    backgroundColor: index % 2 === 0
                                        ? '#EEEEEE'
                                        : '#F5F5F5'
                                } }
                                key={ index }>
                                <ListItemText
                                    primary={ '1 EUR - $ 0.85 USD' }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                </List>
            </Transactions>
        )
    }
}

export default RateList
