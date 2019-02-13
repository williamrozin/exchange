import {
    SET_BASE_CURRENCY,
    SET_TARGET_CURRENCY
} from '../constants/action-types'
import { IState } from '../store/state'

export const setBaseCurrency = (value: IState['exchange']['base']) => {
    return { type: SET_BASE_CURRENCY, value }
}

export const setTargetCurrency = (value: IState['exchange']['target']) => {
    return { type: SET_TARGET_CURRENCY, value }
}
