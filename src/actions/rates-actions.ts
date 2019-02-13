import { REMOVE_RATE } from '../constants/action-types'
import { IRate } from '../store/state'

export const removeRate = (value: IRate) => {
    return { type: REMOVE_RATE, value }
}
