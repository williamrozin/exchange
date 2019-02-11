import React, { ChangeEvent, Component } from 'react'
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
    padding: 24px;
    background-color: #FAFAFA;
    border-radius: 6px;
`

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { value: 0 }
    }

    public handleChangeFrom = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.split(' ')[1] || '0'
        this.setState({ value: parseFloat(value.replace(',', '.')) })
    }

    public handleChangeBase = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.onSetBaseCurrency(event.target.value)
        this.props.onUpdateCurrency()
    }

    public handleChangeTarget = (event: ChangeEvent<HTMLSelectElement>) => {
        this.props.onSetTargetCurrency(event.target.value)
        this.props.onUpdateCurrency()
    }

    public render() {
        const targetValue = this.props.weight * this.state.value
        const currencyOptions = {
            currency: this.props.base,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency'
        }

        return (
            <Content>
                <Form>
                    <select
                        value={ this.props.base }
                        onChange={ this.handleChangeBase }>
                        <option value='GBP'>Pounds</option>
                        <option value='EUR'>Euros</option>
                        <option value='USD'>Dollars</option>
                        <option value='BRL'>Reais</option>
                    </select>
                    <select
                        value={ this.props.target }
                        onChange={ this.handleChangeTarget }>
                        <option value='GBP'>Pounds</option>
                        <option value='EUR'>Euros</option>
                        <option value='USD'>Dollars</option>
                        <option value='BRL'>Reais</option>
                    </select>
                    <Input
                        placeholder='From currency'
                        value={
                            this.state.value.toLocaleString('en', currencyOptions)
                        }
                        onChange={ this.handleChangeFrom }
                    />
                    <div />
                    <Input
                        disabled
                        placeholder='To currency'
                        value={ targetValue.toLocaleString('en', currencyOptions) }
                    />
                </Form>
            </Content>
        )
    }
}

export default Home
