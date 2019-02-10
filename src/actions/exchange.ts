// import { Dispatch } from 'redux'
import { Dispatch } from 'react'
import {
    SET_BASE_CURRENCY,
    SET_CURRENCY_WEIGHT,
    SET_TARGET_CURRENCY
} from '../constants/action-types'
import { IState } from '../store/state'

interface IData {
    base: string
    date: string
    rates: {
        GBP: number
        EUR: number
        USD: number
    }
}

export type TCurrency = keyof IData['rates']

export interface IWeight {
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

export const setCurrencyWeight = (value: number) => {
    return { type: SET_CURRENCY_WEIGHT, value }
}

export const updateCurrency = () => {
    return (dispatch: Dispatch<IWeight>, getState: () => IState) => {
        const { base, target } = getState()
        fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
            .then((res) => res.json())
            .then((data: IData) => {
                const weight = data.rates[target]
                dispatch(setCurrencyWeight(weight))
            })
    }
}
