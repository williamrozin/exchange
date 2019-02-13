import { Button, Collapse, MenuItem, TextField, Typography } from '@material-ui/core'
import format from 'date-fns/format'
import React, { ChangeEvent, Component } from 'react'
import styled from 'styled-components'
import { TCurrency } from '../../actions/quotation-actions'
import { IProps } from '../../containers/RatesContainer'
import { Content } from '../exchange/Exchange'
import RateList from './RateList'

interface IState {
    showFields: boolean
    showAdd: boolean
    base: TCurrency | ''
    target: TCurrency | ''
}

interface ICurrency {
    label: string
    value: TCurrency
}

const Wrapper = styled.div`
    padding: 18px;
    flex: 1;
`

const Form = styled.form`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 18px;
`

const Actions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px;
    margin-top: 18px;
`

const ALL_CURRENCIES: ICurrency[] = [
    {
        label: 'Australia Dollar',
        value: 'AUD'
    },
    {
        label: 'Bulgaria Lev',
        value: 'BGN'
    },
    {
        label: 'Brazil Real',
        value: 'BRL'
    },
    {
        label: 'Canada Dollar',
        value: 'CAD'
    },
    {
        label: 'Switzerland Franc',
        value: 'CHF'
    },
    {
        label: 'China Yuan Renminbi',
        value: 'CNY'
    },
    {
        label: 'Czech Republic Koruna',
        value: 'CZK'
    },
    {
        label: 'Denmark Krone',
        value: 'DKK'
    },
    {
        label: 'Euro Member Countries',
        value: 'EUR'
    },
    {
        label: 'United Kingdom Pound',
        value: 'GBP'
    },
    {
        label: 'Hong Kong Dollar',
        value: 'HKD'
    },
    {
        label: 'Croatia Kuna',
        value: 'HRK'
    },
    {
        label: 'Hungary Forint',
        value: 'HUF'
    },
    {
        label: 'Indonesia Rupiah',
        value: 'IDR'
    },
    {
        label: 'Israel Shekel',
        value: 'ILS'
    },
    {
        label: 'India Rupee',
        value: 'INR'
    },
    {
        label: 'Iceland Krona',
        value: 'ISK'
    },
    {
        label: 'Japan Yen',
        value: 'JPY'
    },
    {
        label: 'Korea (South) Won',
        value: 'KRW'
    },
    {
        label: 'Mexico Peso',
        value: 'MXN'
    },
    {
        label: 'Malaysia Ringgit',
        value: 'MYR'
    },
    {
        label: 'Norway Krone',
        value: 'NOK'
    },
    {
        label: 'New Zealand Dollar',
        value: 'NZD'
    },
    {
        label: 'Philippines Peso',
        value: 'PHP'
    },
    {
        label: 'Poland Zloty',
        value: 'PLN'
    },
    {
        label: 'Romania Leu',
        value: 'RON'
    },
    {
        label: 'Russia Ruble',
        value: 'RUB'
    },
    {
        label: 'Sweden Krona',
        value: 'SEK'
    },
    {
        label: 'Singapore Dollar',
        value: 'SGD'
    },
    {
        label: 'Thailand Baht',
        value: 'THB'
    },
    {
        label: 'Turkey Lira',
        value: 'TRY'
    },
    {
        label: 'United States Dollar',
        value: 'USD'
    },
    {
        label: 'South Africa Rand',
        value: 'ZAR'
    }
]

class Rates extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            base: '',
            showAdd: true,
            showFields: false,
            target: ''
        }
    }

    public handleHideAdd = () => {
        this.setState({ showAdd: false })
    }

    public handleShowFields = () => {
        this.setState({ showFields: true })
    }

    public handleShowAdd = () => {
        this.setState({ showAdd: true, base: '', target: '' })
    }

    public handleHideFields = () => {
        this.setState({ showFields: false })
    }

    public handleChange =
        (type: 'from' | 'to') =>
        (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as TCurrency

        if (type === 'from') {
            this.setState({ base: value })
        } else {
            this.setState({ target: value })
        }
    }

    public handleConfirm = () => {
        const { base, target } = this.state

        if (base && target) {
            this.props.onAddRate({ base, target })
            this.handleHideFields()
        }
    }

    public renderList() {
        return (
            <RateList
                base={ this.props.base }
                target={ this.props.target }
                refreshing={ this.props.refreshing }
                rates={ this.props.rates }
                quotation={ this.props.quotation }
                onRemoveRate={ this.props.onRemoveRate }
            />
        )
    }

    public renderFields() {
        return (
            <Collapse
                in={ this.state.showFields }
                onExited={ this.handleShowAdd }>
                <Typography
                    align='center'
                    variant='subheading'
                    color='textSecondary'
                    style={ { paddingBottom: '18px' } }>
                    Add new currency
                </Typography>
                <Form>
                    <TextField
                        select
                        fullWidth
                        variant='outlined'
                        value={ this.state.base }
                        label='Select currency 1'
                        onChange={ this.handleChange('from') }>
                        {
                            ALL_CURRENCIES.map((currency) =>
                                <MenuItem
                                    key={ currency.value }
                                    value={ currency.value }>
                                    { currency.value } - { currency.label }
                                </MenuItem>
                            )
                        }
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        variant='outlined'
                        value={ this.state.target }
                        label='Select currency 2'
                        onChange={ this.handleChange('to') }>
                        {
                            ALL_CURRENCIES.map((currency) =>
                                <MenuItem
                                    key={ currency.value }
                                    value={ currency.value }>
                                    { currency.value } - { currency.label }
                                </MenuItem>
                            )
                        }
                    </TextField>
                </Form>
                <Actions>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={ this.handleHideFields }>
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={ this.handleConfirm }>
                        Confirm
                    </Button>
                </Actions>
            </Collapse>
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
                <Wrapper>
                    { this.renderFields() }
                    <Collapse
                        in={ this.state.showAdd }
                        onExited={ this.handleShowFields }>
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={ this.handleHideAdd }>
                            Add new currency
                        </Button>
                    </Collapse>
                </Wrapper>
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
