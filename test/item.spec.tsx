import { shallow } from 'enzyme'
import React from 'react'

import Item from '../src/components/rates/list/Item'

describe('Item component', () => {
    it('should render an item with an even index', () => {
        const item = shallow(<Item index={ 0 }>Even item</Item>)
        expect(item.contains('Even item')).toBeTruthy()
        expect(item.contains('"backgroundColor": "#EEEEEE"'))
        expect(item).toMatchSnapshot()
    })
    it('Should render an Item with an odd index', () => {
        const item = shallow(<Item index={ 1 }>Odd item</Item>)
        expect(item.contains('Odd item')).toBeTruthy()
        expect(item.contains('"backgroundColor": "#F5F5F5"'))
        expect(item).toMatchSnapshot()
    })
})
