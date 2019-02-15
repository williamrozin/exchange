import format from 'date-fns/format'
import { shallow } from 'enzyme'
import React from 'react'
import LastUpdate from '../src/components/rates/LastUpdate'

describe('LasUpdate component', () => {
    it('should render LastUpdate with correct time format', () => {
        const timestamp = new Date().getTime()
        const formattedTime = format(new Date(timestamp), 'HH:mm, DD MMM YYYY')
        const item = shallow(<LastUpdate lastUpdate={ timestamp } />)
        expect(item.contains(`Last updated at ${formattedTime}`)).toBeTruthy()
    })
})
