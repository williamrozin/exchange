import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import React, { ChangeEvent, Component } from 'react'
import styled from 'styled-components'
import { TCurrency } from '../../actions/quotation-actions'
import { CURRENCIES } from '../../constants/currencies'
import { IProps } from '../../containers/ExchangeContainer'
import { Action } from '../home/Home'
import LastUpdate from '../rates/LastUpdate'
import RateList from '../rates/RateList'
import Tabs from './tabs/Tabs'

interface IState {
    value: string
}

interface IOption {
    option: 'base' | 'target'
}

type TWalletCurrencies = 'EUR' | 'USD' | 'GBP'

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border: 1px solid silver;
    background-color: #FAFAFA;
`

export const Form = styled.form`
    max-width: 900px;
    width: 100%;
`

const Input = styled.input<IOption>`
    flex: 1;
    padding: 12px;
    margin: 6px 0;
    border-radius: 6px;
    width: calc(100% - 18px);
    border: none;
    font-size: 48px;
    text-align: right;
    background: transparent;
    outline: none;
    color: ${(props) =>
        props.option === 'base'
            ? '#F44336'
            : '#4CAF50'
    };
    ::disabled {
        background: transparent;
    }
`

const FieldContent = styled.div`
    display: flex;
    align-items: center;
`

const Details = styled.div`
    padding: 18px;
`

const Loading = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 64px;
`

export const CURRENCY_OPTIONS = {
   maximumFractionDigits: 2,
   minimumFractionDigits: 2,
   style: 'currency'
}

class Exchange extends Component<IProps, IState> {
    public GBP: HTMLInputElement | null = null
    public USD: HTMLInputElement | null = null
    public EUR: HTMLInputElement | null = null

    constructor(props: IProps) {
        super(props)
        this.state = { value: '' }
    }

    public isOverWallet = (value: string = '0') => {
        const { active, wallet, base, target } = this.props
        const option = active === 'base'
            ? base
            : target

        return parseFloat(value || this.state.value) > wallet[option]
    }

    public isExchangeDisabled = () => {
        const { base, target } = this.props
        const { value } = this.state

        return value.trim() === ''
            || this.isOverWallet()
            || base === target
    }

    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public handleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
        const word = event.target.value.match(/^\d+(\.\d*)?(,\d{0,2})?$/g)
        const value = event.target.value === ''
            ? event.target.value
            : word.join('')

        const isValid = !this.isOverWallet(value)
            && word !== null
            || event.target.value === ''

        if (isValid) {
            this.setState({ value })
        }
    }

    public handleChangeTab =
        (option: 'target' | 'base') =>
        (currency: TCurrency) => {

        if (option === 'base') {
            this.props.onSetBaseCurrency(currency)
        } else {
            this.props.onSetTargetCurrency(currency)
        }

        this.props.onUpdateQuotation(this.props.active, true)
    }

    public handleFocus = (option: 'base' | 'target') => () => {
        this.props.onUpdateQuotation(option, !!this.state.value)
    }

    public handleExchange = () => {
        if (!this.state.value || this.isExchangeDisabled()) {
            return
        }

        const quotation = this.props.quotation[this.props.target] || 1
        const value = quotation * parseFloat(this.state.value || '0')

        this.props.onExchange({
            from: {
                amount: parseFloat(this.state.value),
                currency: this.props.base,
                wallet: this.props.wallet[this.props.base],
            },
            quotation,
            timestamp: new Date().getTime(),
            to: {
                amount: value,
                currency: this.props.target,
                wallet: this.props.wallet[this.props.target],
            }
        })

        this.setState({ value: '' })
    }

    public renderLoading() {
        return (
            <Loading>
                <CircularProgress />
            </Loading>
        )
    }

    public renderInput(option: 'base' | 'target') {
        const { active, quotation } = this.props
        const selected = active === 'base' ? 'target' : 'base'
        const quotationValue = quotation[this.props[selected]] || 1
        const value = active === option
            ? this.state.value
            : (quotationValue * parseFloat(this.state.value || '0')).toFixed(2)

        const ref = option === active
            ? {
                ref: (self: HTMLInputElement) => {
                    this[this.props.base as TWalletCurrencies] = self
                }
            }
            : {}

        return (
            <Input
                value={ value }
                option={ option }
                placeholder='0.00'
                { ...ref }
                onFocus={ this.handleFocus(option) }
                onChange={ this.handleChangeField }
            />
        )
    }

    public renderField =
        (option: 'base' | 'target') =>
        (currency: TCurrency) => {

        const { active, refreshing, wallet } = this.props
        const loading = refreshing && option !== active && this.state.value

        return (
            <FieldContent key={ currency + this.props.base }>
                <Details>
                    <Typography variant='h3'>
                        { currency }
                    </Typography>
                    <Typography variant='h6'>
                        You have
                        { ' ' }
                        {
                           wallet[currency].toLocaleString('en', {
                                currency,
                                ...CURRENCY_OPTIONS
                            })
                        }
                    </Typography>
                </Details>
                { loading ? this.renderLoading() : this.renderInput(option) }
            </FieldContent>
        )
    }

    public renderPocket(option: 'base' | 'target') {
        return (
            <Tabs
                selected={ this.props[option] }
                options={ CURRENCIES }
                secondary={ option === 'base' }
                renderTab={ this.renderField(option) }
                onChangeTab={ this.handleChangeTab(option) }
            />
        )
    }

    public renderConfirm() {
        return (
            <Action>
                <Button
                    fullWidth
                    variant='outlined'
                    onClick={ this.handleGoTo('/') }>
                    Cancel
                </Button>
                <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    disabled={ this.isExchangeDisabled() }
                    onClick={ this.handleExchange }>
                    Exchange
                </Button>
            </Action>
        )
    }

    public renderExchange() {
        return (
            <Content>
                <Form>
                    <Typography
                        align='center'
                        variant='h5'
                        color='textSecondary'
                        style={ {
                            backgroundColor: '#F5F5f5',
                            paddingTop: '18px'
                        } }>
                        Exchanging from { this.props.base } to { this.props.target }
                    </Typography>
                    { this.renderPocket('base') }
                    { this.renderPocket('target') }
                    { this.renderConfirm() }
                </Form>
                <RateList
                    readonly
                    title='Related rates'
                    base={ this.props.base }
                    target={ this.props.target }
                    refreshing={ this.props.refreshing }
                    rates={ this.props.rates }
                    quotation={ this.props.quotation }
                />
            </Content>
        )
    }

    public render() {
        return (
            <>
                { this.renderExchange() }
                <LastUpdate lastUpdate={ this.props.lastUpdate } />
            </>
        )
    }
}

export default Exchange
