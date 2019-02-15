import { mount } from 'enzyme'
import React from 'react'
import RateList from '../src/components/rates/RateList'
import state from '../src/store/state'

describe('RateList component', () => {
    const exchangeScreen = {
        base: state.exchange.base,
        quotation: state.quotation.current,
        rates: state.rates,
        readonly: true,
        refreshing: state.quotation.refreshing,
        target: state.exchange.target,
        title: 'Related rates'
    }

    const ratesScreen = {
        ...exchangeScreen,
        readonly: false,
        title: 'Your rates'
    }

    it('should render the RateList component from Exchange screen', () => {
        const item = mount(<RateList { ...exchangeScreen } />)
        expect(item.exists()).toBeTruthy()
        expect(item).toMatchSnapshot()
    })

    it('should contains the page title Related rates', () => {
        const item = mount(<RateList { ...exchangeScreen } />)
        expect(item.contains('Related rates')).toBeTruthy()
    })

    it('should render the RateList component from Exchange screen', () => {
        const item = mount(<RateList { ...ratesScreen } />)
        expect(item.exists()).toBeTruthy()
        expect(item).toMatchSnapshot()
    })

    it('should contains the page title', () => {
        const item = mount(<RateList { ...ratesScreen } />)
        expect(item.contains('Your rates')).toBeTruthy()
    })
})
