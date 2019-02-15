import { DeepPartial } from 'redux'
import { ADD_RATE, REMOVE_RATE } from '../constants/action-types'
import { IRate, IState } from '../store/state'
import { rates } from '../store/state'

interface IAction {
    type: string
    value: IRate
}

type TState = DeepPartial<IState['rates']>

const reject = (value: IRate) => (rate: IRate) =>
    rate.base !== value.base
        && rate.target !== value.target

const includes = (value: IRate) => (rate: IRate) =>
    rate.base === value.base
        && rate.target === value.target

export default function ratesReducer(state: TState = rates, action: IAction) {
    switch (action.type) {
        case REMOVE_RATE:
            const newRates = state.filter(reject(action.value))

            return newRates
        case ADD_RATE:
            if (state.find(includes(action.value))) {
                return state
            }

            return [ ...state, action.value]
        default:
            return state
    }
}
