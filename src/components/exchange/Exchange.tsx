import { Button, Typography } from '@material-ui/core'
import MobileStepper from '@material-ui/core/MobileStepper'
import Paper from '@material-ui/core/Paper'
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
    value: number
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
        this.state = { value: 0 }
    }

    public getIndexFor = (type: 'base' | 'target') => {
        return CURRENCIES.findIndex((currency: string) => this.props[type] === currency)
    }

    public handleChangeFrom = (type: 'base' | 'target') => (event: ChangeEvent<HTMLInputElement>) => {
        if (type === 'base') {
            this.setState({ value: parseFloat(event.target.value) })
        }
    }

    public handleNext = (type: 'target' | 'base') => () => {
        const currentIndex = this.getIndexFor(type)
        const nextIndex = currentIndex === CURRENCIES.length - 1
            ? 0
            : currentIndex + 1

        if (type === 'base') {
            this.props.onSetBaseCurrency(CURRENCIES[nextIndex])
        } else {
            this.props.onSetTargetCurrency(CURRENCIES[nextIndex])
        }

        this.props.onUpdateCurrency()
    }

    public handleBack = (type: 'target' | 'base') => () => {
        const currentIndex = this.getIndexFor(type)
        const prevIndex = currentIndex === 0
            ? CURRENCIES.length - 1
            : currentIndex - 1

        if (type === 'base') {
            this.props.onSetBaseCurrency(CURRENCIES[prevIndex])
        } else {
            this.props.onSetTargetCurrency(CURRENCIES[prevIndex])
        }

        this.props.onUpdateCurrency()
    }

    public renderField(type: 'base' | 'target') {
        const active = this.getIndexFor(type)
        const value = type === 'base'
            ? this.state.value
            : this.props.weight * this.state.value

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
                                    disabled={ type === 'target' }
                                    value={ value }
                                    onChange={ this.handleChangeFrom(type) }
                                />
                            </FieldContent>
                        )
                    }
                </SwipeableViews>
                <MobileStepper
                    style={ { position: 'relative' } }
                    steps={ CURRENCIES.length }
                    activeStep={ active }
                    backButton={ <Button onClick={ this.handleBack(type) }>Back</Button> }
                    nextButton={ <Button onClick={ this.handleNext(type) }>Next</Button> }
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
