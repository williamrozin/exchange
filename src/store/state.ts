import { DeepPartial } from 'redux'
import { TCurrency } from '../actions/exchange'

export interface IState {
    base: TCurrency
    target: TCurrency
    weight: number
}

export const state: DeepPartial<IState> = {
    base: 'GBP',
    target: 'GBP',
    weight: 1
}
