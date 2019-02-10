import { DeepPartial } from 'redux'

export interface IState {
    base: string
    target: string
    weight: number
}

const state: DeepPartial<IState> = {
    base: 'GBP',
    target: 'GBP',
    weight: 1,
}

export default state
