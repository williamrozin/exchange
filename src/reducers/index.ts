import { DeepPartial } from 'redux'
import {
    EXCHANGE_CURRENCY,
    SET_BASE_CURRENCY,
    SET_CURRENCY_QUOTATION,
    SET_REFRESHING_CURRENCY,
    SET_TARGET_CURRENCY,
    UNSET_REFRESHING_CURRENCY
} from '../constants/action-types'
import { IState, ITransaction } from '../store/state'

interface IAction {
    type: string
    value: string | number
    transactions: ITransaction
    timestamp: IState['lastUpdate']
}

export default function walletReducer(state: DeepPartial<IState>, action: IAction) {
    switch (action.type) {
        case EXCHANGE_CURRENCY:
            const { from, to } = action.transactions

            if (from.currency === to.currency) {
                return state
            }

            return {
                ...state,
                transactions: [...state.transactions, action.transactions],
                wallet: {
                    ...state.wallet,
                    [from.currency]: from.wallet - from.amount,
                    [to.currency]: to.wallet + to.amount
                }
            }
        case SET_REFRESHING_CURRENCY:
            return { ...state, refreshing: true }
        case UNSET_REFRESHING_CURRENCY:
            return { ...state, refreshing: false }
        case SET_BASE_CURRENCY:
            return { ...state, base: action.value }
        case SET_TARGET_CURRENCY:
            return { ...state, target: action.value }
        case SET_CURRENCY_QUOTATION:
            return {
                ...state,
                lastUpdate: action.timestamp,
                quotation: action.value
            }
        default:
            return state
    }
}
