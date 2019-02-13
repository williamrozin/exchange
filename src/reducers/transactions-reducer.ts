import { DeepPartial } from 'redux'
import { UPDATE_TRANSACTIONS } from '../constants/action-types'
import { IState, ITransaction } from '../store/state'
import { transactions } from '../store/state'

interface IAction {
    type: string
    value: ITransaction
}

type TState = DeepPartial<IState['transactions']>

export default function walletReducer(state: TState = transactions, action: IAction) {
    switch (action.type) {
        case UPDATE_TRANSACTIONS:
            const { from, to } = action.value

            if (from.currency === to.currency) {
                return state
            }

            return [
                ...state,
                action.value
            ]
        default:
            return state
    }
}
