import { DeepPartial } from 'redux'
import {
    SET_CURRENCY_QUOTATION,
    SET_REFRESHING_CURRENCY,
    UNSET_REFRESHING_CURRENCY
} from '../constants/action-types'
import { IState } from '../store/state'
import { quotation } from '../store/state'

interface IAction {
    type: string
    value: IState['quotation']['current']
    timestamp: IState['quotation']['lastUpdate']
}

type TState = DeepPartial<IState['quotation']>

export default function quotationReducer(state: TState = quotation, action: IAction) {
    switch (action.type) {
        case SET_REFRESHING_CURRENCY:
            return { ...state, refreshing: true }
        case UNSET_REFRESHING_CURRENCY:
            return { ...state, refreshing: false }
        case SET_CURRENCY_QUOTATION:
            return {
                ...state,
                current: action.value,
                lastUpdate: action.timestamp
            }
        default:
            return state
    }
}
