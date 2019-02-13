import { ADD_RATE, REMOVE_RATE } from '../constants/action-types'
import { IRate } from '../store/state'

export const removeRate = (value: IRate) => {
    return { type: REMOVE_RATE, value }
}

export const addRate = (value: IRate) => {
    return { type: ADD_RATE, value }
}
