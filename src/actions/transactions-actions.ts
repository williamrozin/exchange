import { UPDATE_TRANSACTIONS } from '../constants/action-types'
import { ITransaction } from '../store/state'

export const updateTransactions = (value: ITransaction) => {
    return { type: UPDATE_TRANSACTIONS, value }
}
