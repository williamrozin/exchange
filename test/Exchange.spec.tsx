import { mount } from 'enzyme'
import React from 'react'
import Exchange from '../src/components/exchange/Exchange'
import state, { IState } from '../src/store/state'
import { getMockRouterProps } from './mocks/Router.mock'

describe('Exchange component', () => {
    const routerProps = getMockRouterProps<Exchange>(null)
    it('Should render the Exchange component', () => {
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
        expect(item.exists()).toBeTruthy()
        expect(item).toMatchSnapshot()
    })
})
