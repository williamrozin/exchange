import { mount } from 'enzyme'
import React from 'react'
import Rates from '../src/components/rates/Rates'
import state from '../src/store/state'
import { getMockRouterProps } from './mocks/router'

describe('Rates component', () => {
    const routerProps = getMockRouterProps<Rates>(null)
    const props = {
        base: state.exchange.base,
        lastUpdate: state.quotation.lastUpdate,
        onAddRate: jest.fn(),
        onRemoveRate: jest.fn(),
        onUpdateQuotation: jest.fn(),
        quotation: state.quotation.current,
        rates: state.rates,
        refreshing: state.quotation.refreshing,
        target: state.exchange.target,
        ...routerProps
    }

    const item = mount(<Rates { ...props } />)

    it('should render the Rates component', () => {
        expect(item.exists()).toBeTruthy()
        expect(item).toMatchSnapshot()
    })

    it('should contains the page title', () => {
        expect(item.contains('Rates')).toBeTruthy()
    })

    it('should contains the form title', () => {
        expect(item.contains('Add new currency')).toBeTruthy()
    })

    it('should contains the field for currency 1', () => {
        expect(item.contains('Select currency 1')).toBeTruthy()
    })

    it('should contains the field for currency 2', () => {
        expect(item.contains('Select currency 2')).toBeTruthy()
    })

    it('should contains the action buttons', () => {
        expect(item.contains('Cancel')).toBeTruthy()
        expect(item.contains('Confirm')).toBeTruthy()
    })
})
