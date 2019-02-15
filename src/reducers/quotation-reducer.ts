import { DeepPartial } from 'redux'
import {
    SET_API_ERROR,
    SET_CURRENCY_QUOTATION,
    SET_REFRESHING_CURRENCY,
    UNSET_API_ERROR,
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
        case SET_API_ERROR:
            return { ...state, error: true }
        case UNSET_API_ERROR:
            return { ...state, error: false }
        default:
            return state
    }
}
