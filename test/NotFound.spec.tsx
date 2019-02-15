import { mount } from 'enzyme'
import React from 'react'
import NotFound from '../src/components/not-found/NotFound'
import { getMockRouterProps } from './mocks/router'

describe('NotFound component', () => {
    const routerProps = getMockRouterProps<{}>(null)
    const item = mount(<NotFound { ...routerProps } />)

    it('should render the NotFound component', () => {
        expect(item.exists()).toBeTruthy()
        expect(item).toMatchSnapshot()
    })

    it('should show error code', () => {
        expect(item.contains('404')).toBeTruthy()
    })

    it('should contains error label', () => {
        expect(item.contains('Page not found')).toBeTruthy()
    })

    it('should contains error message', () => {
        const message = 'The content that you\'ve requested does not exists ' +
            'or isn\'t available right now.'

        expect(item.contains(message)).toBeTruthy()
    })

    it('should contains page action', () => {
        expect(item.contains('Take me to the homepage')).toBeTruthy()
    })
})
