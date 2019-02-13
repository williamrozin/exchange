import { DeepPartial } from 'redux'
import { EXCHANGE_CURRENCY } from '../constants/action-types'
import { IState, ITransaction } from '../store/state'
import { transactions } from '../store/state'

interface IAction {
    type: string
    value: string | number
    transactions: ITransaction
    timestamp: IState['quotation']['lastUpdate']
}

type TState = DeepPartial<IState['transactions']>

export default function walletReducer(state: TState = transactions, action: IAction) {
    switch (action.type) {
        case EXCHANGE_CURRENCY:
            const { from, to } = action.transactions

            if (from.currency === to.currency) {
                return state
            }

            return [
                ...state,
                action.transactions
            ]
        default:
            return state
    }
}
