import merge from 'ramda/es/merge'
import { DeepPartial } from 'redux'
import { UPDATE_WALLET } from '../constants/action-types'
import { IState, ITransaction } from '../store/state'
import { wallet } from '../store/state'

interface IAction {
    type: string
    value: ITransaction
}

type TState = DeepPartial<IState['wallet']>

export default function walletReducer(state: TState = wallet, action: IAction) {
    switch (action.type) {
        case UPDATE_WALLET:
            const { from, to } = action.value

            if (from.currency === to.currency) {
                return state
            }

            return merge(state, {
                [from.currency]: from.wallet - from.amount,
                [to.currency]: to.wallet + to.amount
            })
        default:
            return state
    }
}
