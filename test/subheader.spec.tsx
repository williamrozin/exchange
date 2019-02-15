import { shallow } from 'enzyme'
import React from 'react'
import SubHeader from '../src/components/rates/list/SubHeader'

describe('SubHeader component', () => {
    it('Should render a SubHeader with a title', () => {
        const item = shallow(<SubHeader title='The show must go on' />)
        expect(item.contains('The show must go on')).toBeTruthy()
        expect(item).toMatchSnapshot()
    })
})
