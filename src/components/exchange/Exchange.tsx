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
    fromValue: string
    toValue: string
    active: 'base' | 'target'
}

interface IOption {
    option: IState['active']
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
        this.state = {
            active: 'base',
            fromValue: '',
            toValue: ''
        }
    }

    public componentDidMount() {
        if (this[this.props.base as 'USD' | 'GBP' | 'EUR']) {
            this[this.props.base as 'USD' | 'GBP' | 'EUR'].focus()
        }
    }

    public componentDidUpdate(prevProps: IProps) {
        const { fromValue, toValue } = this.state
        const update = this.props.lastUpdate !== prevProps.lastUpdate
            || prevProps.base !== this.props.base
            || prevProps.target !== this.props.target

        if (update) {
            const value = this.isOverWallet(fromValue)
                ? this.props.wallet[this.props.base].toString()
                : this.state.active === 'base'
                    ? fromValue
                    : toValue

            if (this.state.active === 'base') {
                this.setState({
                    fromValue: value,
                    toValue: value ? this.getCurrency(value) : ''
                })
            } else {
                this.setState({
                    fromValue: value ? this.getCurrency(value) : '',
                    toValue: value
                })
            }
        }
    }

    public isOverWallet = (value: string = '0') => {
        const { wallet, base } = this.props

        return parseFloat(value || this.state.fromValue) > wallet[base]
    }

    public isExchangeDisabled = () => {
        const { base, target } = this.props
        const { fromValue: value } = this.state

        return value.trim() === ''
            || this.isOverWallet()
            || base === target
    }

    public getCurrency = (value: string) => {
        const { active } = this.state
        const selected = active === 'base' ? 'target' : 'base'
        const quotation = 1 / this.props.quotation[this.props[selected]]
        const base = 1 / this.props.quotation[this.props[active]]

        return ((base / quotation) * parseFloat(value || '0')).toFixed(2)
    }

    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public handleChangeField =
        (option: IState['active']) =>
        (event: ChangeEvent<HTMLInputElement>) => {

        const word = event.target.value.match(/^\d+(\.\d{0,2})?$/g)

        if (word === null || event.target.value === '') {
            this.setState({ fromValue: '', toValue: '' })
            return
        }

        const value = event.target.value === ''
            ? event.target.value
            : word.join('')

        const correction = value ? this.getCurrency(value) : ''

        if (this.isOverWallet(option === 'base' ? value : correction)) {
            return
        }

        if (option === 'base') {
            this.setState({
                fromValue: value,
                toValue: correction
            })
        } else {
            this.setState({
                fromValue: correction,
                toValue: value
            })
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
    }

    public handleFocus = (option: IState['active']) => () => {
        this.setState({ active: option })
    }

    public handleExchange = () => {
        if (!this.state.fromValue || this.isExchangeDisabled()) {
            return
        }

        this.props.onExchange({
            from: {
                amount: parseFloat(this.state.fromValue),
                currency: this.props.base,
                wallet: this.props.wallet[this.props.base],
            },
            quotation: this.props.quotation[this.props.target] || 1,
            timestamp: new Date().getTime(),
            to: {
                amount: parseFloat(this.state.toValue),
                currency: this.props.target,
                wallet: this.props.wallet[this.props.target],
            }
        })

        this.setState({ fromValue: '', toValue: '' })
    }

    public renderLoading() {
        return (
            <Loading>
                <CircularProgress />
            </Loading>
        )
    }

    public renderInput(option: IState['active']) {
        const { active, fromValue, toValue } = this.state
        const value = option === 'base'
                ? fromValue
                : toValue

        const ref = option === active
            ? {
                ref: (self: HTMLInputElement) => {
                    this[this.props.base as TWalletCurrencies] = self
                }
            }
            : {}

        const type = option === 'base'
            ? 'from'
            : 'to'

        return (
            <Input
                required
                value={ value }
                option={ option }
                placeholder='0.00'
                title={
                    `Insert the amount of money that you want to exchange ${type}`
                }
                { ...ref }
                onFocus={ this.handleFocus(option) }
                onChange={ this.handleChangeField(option) }
            />
        )
    }

    public renderField =
        (option: IState['active']) =>
        (currency: TCurrency) => {
        const { active } = this.state
        const { refreshing, wallet } = this.props
        const loading = refreshing && option !== active && this.state.fromValue
        const formattedValue = wallet[currency].toLocaleString('en', {
            currency,
            ...CURRENCY_OPTIONS
        })

        return (
            <FieldContent key={ currency + this.props.base }>
                <Details>
                    <Typography variant='h3'>
                        { currency }
                    </Typography>
                    <Typography variant='h6'>
                        { `You have ${formattedValue}` }
                    </Typography>
                </Details>
                { loading ? this.renderLoading() : this.renderInput(option) }
            </FieldContent>
        )
    }

    public renderPocket(option: IState['active']) {
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
        const title = !this.state.fromValue || !this.state.toValue
            ? 'You need to insert the amount of money to exchange'
            : this.isExchangeDisabled()
                ? this.props.base === this.props.target
                    ? 'You can\'t exchange between same currencies'
                    : ''
                : ''

        return (
            <Action>
                <Button
                    fullWidth
                    variant='outlined'
                    onClick={ this.handleGoTo('/') }>
                    Cancel
                </Button>
                <div title={ title }>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        disabled={ this.isExchangeDisabled() }
                        onClick={ this.handleExchange }>
                        Exchange
                    </Button>
                </div>
            </Action>
        )
    }

    public renderExchange() {
        const {
            base,
            target,
            refreshing,
            rates,
            quotation
        } = this.props

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
                        { `Exchanging from ${base} to ${target}` }
                    </Typography>
                    { this.renderPocket('base') }
                    { this.renderPocket('target') }
                    { this.renderConfirm() }
                </Form>
                <RateList
                    readonly
                    title='Related rates'
                    base={ base }
                    target={ target }
                    refreshing={ refreshing }
                    rates={ rates }
                    quotation={ quotation }
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
