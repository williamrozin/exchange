import { Dispatch } from 'react'
import {
    SET_CURRENCY_QUOTATION,
    SET_REFRESHING_CURRENCY,
    UNSET_REFRESHING_CURRENCY
} from '../constants/action-types'
import { IState } from '../store/state'

interface IData {
    base: string
    date: string
    rates: {
        AUD: number
        BGN: number
        BRL: number
        CAD: number
        CHF: number
        CNY: number
        CZK: number
        DKK: number
        EUR: number
        GBP: number
        HKD: number
        HRK: number
        HUF: number
        IDR: number
        ILS: number
        INR: number
        ISK: number
        JPY: number
        KRW: number
        MXN: number
        MYR: number
        NOK: number
        NZD: number
        PHP: number
        PLN: number
        RON: number
        RUB: number
        SEK: number
        SGD: number
        THB: number
        TRY: number
        USD: number
        ZAR: number
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

export const setCurrencyQuotation =
    (value: IState['quotation']['current'], timestamp: IState['quotation']['lastUpdate']) => {
    return { type: SET_CURRENCY_QUOTATION, value, timestamp }
}

export const setRefreshingCurrency = () => {
    return { type: SET_REFRESHING_CURRENCY }
}

export const unsetRefreshingCurrency = () => {
    return { type: UNSET_REFRESHING_CURRENCY }
}

export const updateQuotation = (refresh?: boolean) => {
    return (dispatch: Dispatch<IQuotation | IRefresh>, getState: () => IState) => {
        const { base } = getState().exchange

        if (refresh) {
            dispatch(setRefreshingCurrency())
        }

        fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then((res) => res.json())
            .then((data: IData) => {
                const timestamp = new Date().getTime()
                const quotation = {
                    ...data.rates,
                    [base]: 1
                }

                dispatch(setCurrencyQuotation(quotation, timestamp))
            })
            .then(() => {
                dispatch(unsetRefreshingCurrency())
            })
    }
}