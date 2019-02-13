import { DeepPartial } from 'redux'
import {
    SET_BASE_CURRENCY,
    SET_TARGET_CURRENCY,
} from '../constants/action-types'
import { IState, ITransaction } from '../store/state'
import { exchange } from '../store/state'

interface IAction {
    type: string
    value: string | number
    transactions: ITransaction
    timestamp: IState['quotation']['lastUpdate']
}

type TState = DeepPartial<IState['exchange']>

export default function exchangeReducer(state: TState = exchange, action: IAction) {
    switch (action.type) {
        case SET_BASE_CURRENCY:
            return { ...state, base: action.value }
        case SET_TARGET_CURRENCY:
            return { ...state, target: action.value }
        default:
            return state
    }
}
