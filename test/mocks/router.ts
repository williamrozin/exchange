import { Href, UnregisterCallback } from 'history'
import { RouteComponentProps } from 'react-router'

const location = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {}
}

export function getMockRouterProps<P>(data: P) {
    const props: RouteComponentProps<P> = {
        history: {
            action: 'POP',
            block: (_): UnregisterCallback => null,
            createHref: (_): Href => '',
            go: (_): void => null,
            goBack: (): void => null,
            goForward: (): void => null,
            length: 2,
            listen: (_): UnregisterCallback => null,
            location,
            push: (): void => null,
            replace: (): void => null,
        },
        location,
        match: {
            isExact: true,
            params: data,
            path: '',
            url: ''
        },
        staticContext: {}
    }

    return props
}
