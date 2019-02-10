import React, { SFC } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import HomeContainer from './containers/HomeContainer'
import { store } from './store'

const App: SFC = () =>
    <Provider store={ store }>
        <HomeContainer />
    </Provider>

ReactDom.render(<App />, document.getElementById('root'))
