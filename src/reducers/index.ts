import { DeepPartial } from 'redux'
import {
    EXCHANGE_CURRENCY,
    SET_BASE_CURRENCY,
    SET_CURRENCY_QUOTATION,
    SET_TARGET_CURRENCY,
} from '../constants/action-types'
import { IHistory, IState } from '../store/state'

interface IAction {
    type: string
    value: string | number
    history: IHistory
}

export default function walletReducer(state: DeepPartial<IState>, action: IAction) {
    switch (action.type) {
        case EXCHANGE_CURRENCY:
            const { from, to } = action.history

            if (from.currency === to.currency) {
                return state
            }

            return {
                ...state,
                history: [...state.history, action.history],
                wallet: {
                    ...state.wallet,
                    [from.currency]: from.wallet - from.amount,
                    [to.currency]: to.wallet + to.amount
                }
            }
        case SET_BASE_CURRENCY:
            return { ...state, base: action.value }
        case SET_TARGET_CURRENCY:
            return { ...state, target: action.value }
        case SET_CURRENCY_QUOTATION:
            return { ...state, quotation: action.value }
        default:
            return state
    }
}
