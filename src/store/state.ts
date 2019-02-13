import { DeepPartial } from 'redux'
import { TCurrency } from '../actions/exchange'

export interface IState {
    base: TCurrency
    transactions: ITransaction[]
    quotation: { [keys in TCurrency]: number }
    refreshing: boolean
    target: TCurrency
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

export const state: DeepPartial<IState> = {
    base: 'GBP',
    quotation: {},
    rates: [
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
    ],
    refreshing: false,
    target: 'GBP',
    transactions: [
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
    ],
    wallet: {
        EUR: 7000,
        GBP: 19500,
        USD: 5570.68
    }
}
