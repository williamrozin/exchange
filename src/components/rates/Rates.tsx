import { Button, Typography } from '@material-ui/core'
import format from 'date-fns/format'
import React, { Component } from 'react'
import styled from 'styled-components'
import { IProps } from '../../containers/RatesContainer'
import { Content } from '../exchange/Exchange'
import RateList from './RateList'

const Form = styled.div`
    padding: 18px;
    flex: 1;
`

class Rates extends Component<IProps> {
    public renderList() {
        return (
            <RateList
                base={ this.props.base }
                target={ this.props.target }
                refreshing={ this.props.refreshing }
                rates={ this.props.rates }
                quotation={ this.props.quotation }
            />
        )
    }

    public renderRates() {
        return (
            <Content>
                <Typography
                    align='center'
                    variant='h5'
                    color='textSecondary'
                    style={ { paddingTop: '18px' } }>
                    Rates
                </Typography>
                <Form>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'>
                        Add new currency
                    </Button>
                </Form>
                { this.renderList() }
            </Content>
        )
    }

    public render() {
        return (
            <>
                { this.renderRates() }
                <Typography
                    align='center'
                    variant='caption'
                    style={ { paddingTop: '18px' } }>
                    Last updated at
                    { ' ' }
                    { format(new Date(this.props.lastUpdate), 'HH:mm, DD MMM YYYY') }
                </Typography>
            </>
        )
    }
}

export default Rates
