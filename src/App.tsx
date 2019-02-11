import React, { SFC } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import ExchangeContainer from './containers/ExchangeContainer'
import { store } from './store'

const App: SFC = () =>
    <Provider store={ store }>
        <ExchangeContainer />
    </Provider>

ReactDom.render(<App />, document.getElementById('root'))
