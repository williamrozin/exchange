import append from 'ramda/es/append'
import reject from 'ramda/es/reject'
import { DeepPartial } from 'redux'
import { ADD_RATE, REMOVE_RATE } from '../constants/action-types'
import { IRate, IState } from '../store/state'
import { rates } from '../store/state'

interface IAction {
    type: string
    value: IRate
}

type TState = DeepPartial<IState['rates']>

const equals = (value: IRate) => (rate: IRate) =>
    rate.base === value.base
        && rate.target === value.target

export default function ratesReducer(state: TState = rates, action: IAction) {
    switch (action.type) {
        case REMOVE_RATE:
            return reject(equals(action.value), state)
        case ADD_RATE:
            if (state.find(equals(action.value))) {
                return state
            }

            return append(action.value, state)
        default:
            return state
    }
}
