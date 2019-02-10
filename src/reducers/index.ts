import { DeepPartial } from 'redux'
import {
    SET_BASE_CURRENCY,
    SET_CURRENCY_WEIGHT,
    SET_TARGET_CURRENCY,
} from '../constants/action-types'
import { IState } from '../store/state'

interface IAction {
    type: string
    value: string | number
}

export default function walletReducer(state: DeepPartial<IState>, action: IAction) {
    switch (action.type) {
        case SET_BASE_CURRENCY:
            return { ...state, base: action.value }
        case SET_TARGET_CURRENCY:
            return { ...state, target: action.value }
        case SET_CURRENCY_WEIGHT:
            return { ...state, weight: action.value }
        default:
            return state
    }
}
