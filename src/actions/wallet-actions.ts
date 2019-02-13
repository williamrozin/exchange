import { UPDATE_WALLET } from '../constants/action-types'
import { ITransaction } from '../store/state'

export const updateWallet = (value: ITransaction) => {
    return { type: UPDATE_WALLET, value }
}
