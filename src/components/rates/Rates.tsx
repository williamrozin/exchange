import { Button, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Content } from '../exchange/Exchange'
import RateList from './RateList'

const Form = styled.div`
    padding: 18px;
    flex: 1;
`

class Rates extends Component {
    public renderRates() {
        return (
            <RateList />
        )
    }

    public render() {
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
                { this.renderRates() }
            </Content>
        )
    }
}

export default Rates
