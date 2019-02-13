import { DeepPartial } from 'redux'
import { IState, ITransaction } from '../store/state'
import { rates } from '../store/state'

interface IAction {
    type: string
    value: string | number
    transactions: ITransaction
    timestamp: IState['quotation']['lastUpdate']
}

type TState = DeepPartial<IState['rates']>

export default function ratesReducer(state: TState = rates, action: IAction) {
    switch (action.type) {
        default:
            return state
    }
}
