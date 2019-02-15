import { mount } from 'enzyme'
import React from 'react'
import Exchange from '../src/components/exchange/Exchange'
import state, { IState } from '../src/store/state'
import { getMockRouterProps } from './mocks/router'

describe('Exchange component', () => {
    const routerProps = getMockRouterProps<Exchange>(null)
    const props = {
        base: state.exchange.base,
        lastUpdate: state.quotation.lastUpdate,
        onExchange: jest.fn(),
        onSetBaseCurrency: jest.fn(),
        onSetTargetCurrency: jest.fn(),
        onUpdateQuotation: jest.fn(),
        quotation: state.quotation.current as IState['quotation']['current'],
        rates: state.rates,
        refreshing: state.quotation.refreshing,
        target: state.exchange.target,
        transactions: state.transactions,
        wallet: state.wallet as IState['wallet'],
        ...routerProps
    }

    const item = mount(<Exchange { ...props } />)

    it('should render the Exchange component', () => {
        expect(item.exists()).toBeTruthy()
    })

    it('should contains the pockets title', () => {
        expect(item.contains('Exchanging from GBP to EUR')).toBeTruthy()
    })

    it('should contains the pockets value', () => {
        expect(item.contains('You have £19,500.00')).toBeTruthy()
    })

    it('should contains the related rates', () => {
        expect(item.contains('Related rates')).toBeTruthy()
    })
})
