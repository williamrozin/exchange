import { shallow } from 'enzyme'
import React from 'react'

import Item from '../src/components/rates/list/Item'

describe('hello', () => {
    it('should eita', () => {
        const item = shallow(<Item index={ 1 }>EITA</Item>)
        expect(item.contains('EITA')).toBeTruthy()
        expect(item).toMatchSnapshot()
    })
})
