import { DeepPartial } from 'redux'
import { REMOVE_RATE } from '../constants/action-types'
import { IRate, IState } from '../store/state'
import { rates } from '../store/state'

interface IAction {
    type: string
    value: IRate
}

type TState = DeepPartial<IState['rates']>

export default function ratesReducer(state: TState = rates, action: IAction) {
    switch (action.type) {
        case REMOVE_RATE:
            const newRates = state.filter((rate: IRate) =>
                rate.base !== action.value.base
                    && rate.target !== action.value.target
            )

            return newRates
        default:
            return state
    }
}
