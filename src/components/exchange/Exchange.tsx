import { Button, CircularProgress, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import React, { ChangeEvent, Component } from 'react'
import styled from 'styled-components'
import { TCurrency } from '../../actions/exchange'
import { IProps } from '../../containers/ExchangeContainer'
import Tabs from './tabs/Tabs'

interface IState {
    value: string
}

interface IOption {
    option: 'base' | 'target'
}

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 24px;
`

const Input = styled.input<IOption>`
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
    color: ${(props) =>
        props.option === 'base'
            ? '#F44336'
            : '#4CAF50'
    };
    ::disabled {
        background: transparent;
    }
`

const Form = styled.form`
    background-color: #FAFAFA;
    border-radius: 6px;
    max-width: 900px;
`

const FieldContent = styled.div`
    display: flex;
    align-items: center;
`

const Details = styled.div`
    padding: 24px;
`

const Loading = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 64px;
`

const CURRENCIES: TCurrency[] = ['GBP', 'EUR', 'USD', 'BRL']
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

    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public handleChangeFrom =
        (option: 'base' | 'target') =>
        (event: ChangeEvent<HTMLInputElement>) => {

        const word = event.target.value.match(/^\d+(\.\d*)?(,\d{0,2})?$/g)
        const value = event.target.value === ''
            ? event.target.value
            : word.join('')

        if (option === 'base' && word !== null || event.target.value === '') {
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

        this.props.onUpdateCurrency(true)
    }

    public handleExchange = () => {
        if (!this.state.value) {
            return
        }

        const value =
            this.props.quotation * parseFloat(this.state.value || '0')

        this.props.onExchange({
            from: {
                amount: parseFloat(this.state.value),
                currency: this.props.base,
                wallet: this.props.wallet[this.props.base],
            },
            quotation: this.props.quotation,
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
        const value = option === 'base'
            ? this.state.value
            : (this.props.quotation * parseFloat(this.state.value || '0')).toFixed(2)

        return (
            <Input
                option={ option }
                placeholder={
                    option === 'base'
                        ? 'Enter some value'
                        : ''
                }
                disabled={ option === 'target' }
                value={ value }
                onChange={ this.handleChangeFrom(option) }
            />
        )
    }

    public renderField =
        (option: 'base' | 'target') =>
        (currency: TCurrency) => {

        const { refreshing, wallet } = this.props
        const loading = refreshing && option === 'target' && this.state.value

        return (
            <FieldContent key={ currency }>
                <Details>
                    <Typography variant='h3'>
                        { currency }
                    </Typography>
                    <Typography variant='h6'>
                        You have
                        { ' ' }
                        {
                           wallet[currency].toLocaleString('gb', {
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
                secondary={ option === 'target' }
                renderTab={ this.renderField(option) }
                onChangeTab={ this.handleChangeTab(option) }
            />
        )
    }

    public renderConfirm() {
        return (
            <Button
                fullWidth
                color='primary'
                variant='contained'
                style={ {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                } }
                onClick={ this.handleExchange }>
                Exchange
            </Button>
        )
    }

    public render() {
        return (
            <Content>
                <Paper>
                    <Form>
                        { this.renderPocket('base') }
                        { this.renderPocket('target') }
                        { this.renderConfirm() }
                    </Form>
                </Paper>
                <Button onClick={ this.handleGoTo('/') }>
                    Back
                </Button>
            </Content>
        )
    }
}

export default Exchange
