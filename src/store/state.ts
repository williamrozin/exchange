import { DeepPartial } from 'redux'
import { TCurrency } from '../actions/exchange'

export interface IState {
    base: TCurrency
    target: TCurrency
    quotation: number
    history: IHistory[]
    wallet: { [keys in TCurrency]: number }
}

export interface IHistory {
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
    history: [
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
    quotation: 1,
    target: 'GBP',
    wallet: {
        BRL: 1200,
        EUR: 7000,
        GBP: 19500,
        USD: 5570.68
    }
}
