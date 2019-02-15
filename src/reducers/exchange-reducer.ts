import assoc from 'ramda/es/assoc'
import { DeepPartial } from 'redux'
import {
    SET_BASE_CURRENCY,
    SET_TARGET_CURRENCY,
} from '../constants/action-types'
import { IState } from '../store/state'
import { exchange } from '../store/state'

interface IAction {
    type: string
    value: IState['exchange']['base'] | IState['exchange']['target']
    active: 'base' | 'target'
}

type TState = DeepPartial<IState['exchange']>

export default function exchangeReducer(state: TState = exchange, action: IAction) {
    switch (action.type) {
        case SET_BASE_CURRENCY:
            return assoc('base', action.value, state)
        case SET_TARGET_CURRENCY:
            return assoc('target', action.value, state)
        default:
            return state
    }
}
