import { DeepPartial } from 'redux'
import { TCurrency } from '../actions/exchange'

export interface IState {
    exchange: {
        base: TCurrency
        target: TCurrency
    }
    transactions: ITransaction[]
    quotation: {
        current: { [keys in TCurrency]: number }
        refreshing: boolean
        lastUpdate: number
    }
    wallet: { [keys in TCurrency]: number }
    rates: IRate[]
}

export interface IRate {
    base: TCurrency
    target: TCurrency
}

export interface ITransaction {
    from: {
        amount: number
        currency: TCurrency
        wallet: number
    }
    to: {
        amount: number
        currency: TCurrency
        wallet: number
    }
    timestamp: number
    quotation: number
}

export const exchange: IState['exchange'] = {
    base: 'GBP',
    target: 'GBP'
}

export const quotation: IState['quotation'] = {
    current: {} as IState['quotation']['current'],
    lastUpdate: new Date().getTime(),
    refreshing: false
}

export const transactions: IState['transactions'] = [
    {
        from: {
            amount: 500,
            currency: 'GBP',
            wallet: 20000
        },
        quotation: 1.14,
        timestamp: 1549919565976,
        to: {
            amount: 570.68,
            currency: 'USD',
            wallet: 5000
        }
    }
]

export const rates: IState['rates'] = [
    {
        base: 'GBP',
        target: 'EUR'
    },
    {
        base: 'EUR',
        target: 'USD'
    },
    {
        base: 'USD',
        target: 'GBP'
    }
]

export const wallet: Partial<IState['wallet']> = {
    EUR: 7000,
    GBP: 19500,
    USD: 5570.68
}

export const state: DeepPartial<IState> = {
    exchange,
    quotation,
    rates,
    transactions,
    wallet
}

export default state
