import { Button, Typography } from '@material-ui/core'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
import {
    KeyboardArrowLeft as IconLeft,
    KeyboardArrowRight as IconRight
} from '@material-ui/icons'
import React, { ChangeEvent, Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'

interface IProps {
    base: string
    target: string
    weight: number
    onSetBaseCurrency(value: string): void
    onSetTargetCurrency(value: string): void
    onSetCurrencyWeight(value: number): void
    onUpdateCurrency(): void
}

interface IState {
    value: string
}

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100vh;
`

const Input = styled.input`
    flex: 1;
    padding: 12px;
    margin: 6px 0;
    border-radius: 6px;
    width: calc(100% - 24px);
    border: none;
    font-size: 48px;
    text-align: right;
    background: transparent;
    outline: none;
    ::disabled {
        background: transparent;
    }
`

const Form = styled.form`
    background-color: #FAFAFA;
    border-radius: 6px;
    max-width: 900px;
`

const Field = styled.div`
    padding: 24px;
    max-width: 900px;
`

const FieldContent = styled.div`
    display: flex;
    align-items: center;
`

const Details = styled.div`
    padding: 24px;
`

const CURRENCIES = ['GBP', 'EUR', 'USD', 'BRL']
const CURRENCY_OPTIONS = {
   maximumFractionDigits: 2,
   minimumFractionDigits: 2,
   style: 'currency'
}

class Exchange extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { value: '' }
    }

    public getIndexFor = (option: 'base' | 'target') => {
        return CURRENCIES.findIndex((currency: string) => this.props[option] === currency)
    }

    public getPreviousIndex = (option: 'base' | 'target') => {
        const currentIndex = this.getIndexFor(option)

        return currentIndex === 0
            ? CURRENCIES.length - 1
            : currentIndex - 1
    }

    public getNextIndex = (option: 'base' | 'target') => {
        const currentIndex = this.getIndexFor(option)

        return currentIndex === CURRENCIES.length - 1
            ? 0
            : currentIndex + 1
    }

    public handleChangeFrom = (option: 'base' | 'target') => (event: ChangeEvent<HTMLInputElement>) => {
        const word = event.target.value.match(/^\d+(\.\d*)?(,\d{0,2})?$/g)
        const value = event.target.value === ''
            ? event.target.value
            : word.join('')

        if (option === 'base' && word !== null || event.target.value === '') {
            this.setState({ value })
        }
    }

    public handleChangeTab = (option: 'target' | 'base', type: 'previous' | 'next') => () => {
        const index = type === 'previous'
            ? this.getPreviousIndex(option)
            : this.getNextIndex(option)

        if (option === 'base') {
            this.props.onSetBaseCurrency(CURRENCIES[index])
        } else {
            this.props.onSetTargetCurrency(CURRENCIES[index])
        }

        this.props.onUpdateCurrency()
    }

    public renderField(option: 'base' | 'target') {
        const active = this.getIndexFor(option)
        const value = option === 'base'
            ? this.state.value
            : (this.props.weight * parseFloat(this.state.value || '0')).toFixed(2)

        return (
            <Field>
                <SwipeableViews index={ active }>
                    {
                        CURRENCIES.map((currency: string) =>
                            <FieldContent key={ currency }>
                                <Details>
                                    <Typography variant='h3'>
                                        { currency }
                                    </Typography>
                                    <Typography variant='h6'>
                                        You have
                                        { ' ' }
                                        {
                                            (Math.random() * 1000).toLocaleString('gb', {
                                                currency,
                                                ...CURRENCY_OPTIONS
                                            })
                                        }
                                    </Typography>
                                </Details>
                                <Input
                                    placeholder='Enter some value'
                                    disabled={ option === 'target' }
                                    value={ value }
                                    onChange={ this.handleChangeFrom(option) }
                                />
                            </FieldContent>
                        )
                    }
                </SwipeableViews>
                <MobileStepper
                    style={ { position: 'relative' } }
                    steps={ CURRENCIES.length }
                    activeStep={ active }
                    backButton={
                        <Button
                            color='primary'
                            onClick={ this.handleChangeTab(option, 'previous') }>
                            <IconLeft />
                            { CURRENCIES[this.getPreviousIndex(option)] }
                        </Button>
                    }
                    nextButton={
                        <Button
                            color='primary'
                            onClick={ this.handleChangeTab(option, 'next') }>
                            { CURRENCIES[this.getNextIndex(option)] }
                            <IconRight />
                        </Button>
                    }
                />
            </Field>
        )
    }

    public render() {
        return (
            <Content>
                <Paper>
                    <Form>
                        { this.renderField('base') }
                        { this.renderField('target') }
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            style={ {
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0
                            } }>
                            Exchange
                        </Button>
                    </Form>
                </Paper>
            </Content>
        )
    }
}

export default Exchange
