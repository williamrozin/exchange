// import { Dispatch } from 'redux'
import { Dispatch } from 'react'
import {
    EXCHANGE_CURRENCY,
    SET_BASE_CURRENCY,
    SET_CURRENCY_QUOTATION,
    SET_TARGET_CURRENCY
} from '../constants/action-types'
import { IHistory, IState } from '../store/state'

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

export const updateCurrency = () => {
    return (dispatch: Dispatch<IQuotation>, getState: () => IState) => {
        const { base, target } = getState()
        fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then((res) => res.json())
            .then((data: IData) => {
                const quotation = base === target
                    ? 1
                    : data.rates[target]
                dispatch(setCurrencyQuotation(quotation))
            })
    }
}

export const exchange = (history: IHistory) => {
    return { type: EXCHANGE_CURRENCY, history }
}
