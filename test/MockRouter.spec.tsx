import { getMockRouterProps } from './mocks/router'

describe('Exchange component', () => {
    const routerProps = getMockRouterProps<{}>(null)

    it('should ensure the model of history', () => {
        expect(routerProps.history).toHaveProperty('action')
        expect(routerProps.history).toHaveProperty('block')
        expect(routerProps.history).toHaveProperty('action')
        expect(routerProps.history).toHaveProperty('block')
        expect(routerProps.history).toHaveProperty('createHref')
        expect(routerProps.history).toHaveProperty('go')
        expect(routerProps.history).toHaveProperty('goBack')
        expect(routerProps.history).toHaveProperty('goForward')
        expect(routerProps.history).toHaveProperty('length')
        expect(routerProps.history).toHaveProperty('listen')
        expect(routerProps.history).toHaveProperty('location')
        expect(routerProps.history).toHaveProperty('push')
        expect(routerProps.history).toHaveProperty('replace')
    })

    it('should ensure the model of location', () => {
        expect(routerProps.location).toHaveProperty('hash')
        expect(routerProps.location).toHaveProperty('key')
        expect(routerProps.location).toHaveProperty('pathname')
        expect(routerProps.location).toHaveProperty('search')
        expect(routerProps.location).toHaveProperty('state')
    })

    it('should ensure the model of match', () => {
        expect(routerProps.match).toHaveProperty('isExact')
        expect(routerProps.match).toHaveProperty('params')
        expect(routerProps.match).toHaveProperty('path')
        expect(routerProps.match).toHaveProperty('url')
    })

    it('should ensure the model of staticContext', () => {
        expect(routerProps.staticContext).toMatchObject({})
    })
})
