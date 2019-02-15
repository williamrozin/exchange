import { mount } from 'enzyme'
import React from 'react'
import Tabs from '../src/components/exchange/tabs/Tabs'

describe('Tabs component', () => {
    const props = {
        onChangeTab: jest.fn(),
        options: ['USD', 'EUR', 'GBP'],
        renderTab: (value: string) => <div key={ value }>{ value }</div>,
        secondary: false,
        selected: 'EUR'
    }

    const item = mount(<Tabs { ...props } />)

    it('Should render the Tabs component', () => {
        expect(item.exists()).toBeTruthy()
        expect(item).toMatchSnapshot()
    })

    it('should have the USD tab', () => {
        expect(item.contains('USD')).toBeTruthy()
    })

    it('should have the EUR tab', () => {
        expect(item.contains('EUR')).toBeTruthy()
    })

    it('should have the GBP tab', () => {
        expect(item.contains('GBP')).toBeTruthy()
    })
})
