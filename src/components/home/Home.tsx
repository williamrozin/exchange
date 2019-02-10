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

`

const Form = styled.form`
    padding: 24px;
    background-color: silver;
    border-radius: 6px;
`

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { value: 0 }
    }

    public handleChangeFrom = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: parseInt(event.target.value, 10) })
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
        return (
            <Content>
                <Form>
                    <select
                        value={ this.props.base }
                        onChange={ this.handleChangeBase }>
                        <option value='GBP'>Pounds</option>
                        <option value='EUR'>Euros</option>
                        <option value='USD'>Dollars</option>
                    </select>
                    <select
                        value={ this.props.target }
                        onChange={ this.handleChangeTarget }>
                        <option value='GBP'>Pounds</option>
                        <option value='EUR'>Euros</option>
                        <option value='USD'>Dollars</option>
                    </select>
                    <Input
                        type='number'
                        placeholder='From currency'
                        value={ this.state.value }
                        onChange={ this.handleChangeFrom }
                    />
                    <div />
                    <Input
                        disabled
                        type='number'
                        placeholder='To currency'
                        value={ this.state.value * this.props.weight }
                    />
                </Form>
            </Content>
        )
    }
}

export default Home
