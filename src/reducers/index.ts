import { combineReducers } from 'redux'
import exchange from './exchange-reducer'
import quotation from './quotation-reducer'
import rates from './rates-reducer'
import transactions from './transactions-reducer'
import wallet from './wallet-reducer'

export default combineReducers({
    exchange,
    quotation,
    rates,
    transactions,
    wallet
})
