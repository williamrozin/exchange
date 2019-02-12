import { Dispatch } from 'react'
import {
    EXCHANGE_CURRENCY,
    SET_BASE_CURRENCY,
    SET_CURRENCY_QUOTATION,
    SET_REFRESHING_CURRENCY,
    SET_TARGET_CURRENCY,
    UNSET_REFRESHING_CURRENCY
} from '../constants/action-types'
import { IState, ITransaction } from '../store/state'

interface IData {
    base: string
    date: string
    rates: {
        GBP: number
        EUR: number
        USD: number
        BRL: number
    }
}

export type TCurrency = keyof IData['rates']

export interface IQuotation {
    type: string
    value: number
}

export interface IRefresh {
    type: string
}

export interface ICurrency {
    type: string
    value: string
}

export const setBaseCurrency = (value: string) => {
    return { type: SET_BASE_CURRENCY, value }
}

export const setTargetCurrency = (value: string) => {
    return { type: SET_TARGET_CURRENCY, value }
}

export const setCurrencyQuotation = (value: number) => {
    return { type: SET_CURRENCY_QUOTATION, value }
}

export const setRefreshingCurrency = () => {
    return { type: SET_REFRESHING_CURRENCY }
}

export const unsetRefreshingCurrency = () => {
    return { type: UNSET_REFRESHING_CURRENCY }
}

export const updateCurrency = (refresh?: boolean) => {
    return (dispatch: Dispatch<IQuotation | IRefresh>, getState: () => IState) => {
        const { base, target } = getState()

        if (refresh) {
            dispatch(setRefreshingCurrency())
        }

        fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then((res) => res.json())
            .then((data: IData) => {
                const quotation = base === target
                    ? 1
                    : data.rates[target]
                dispatch(setCurrencyQuotation(quotation))
            })
            .then(() => {
                dispatch(unsetRefreshingCurrency())
            })
    }
}

export const exchange = (transactions: ITransaction) => {
    return { type: EXCHANGE_CURRENCY, transactions }
}
