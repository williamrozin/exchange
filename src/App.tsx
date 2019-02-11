import { createMuiTheme } from '@material-ui/core'
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React, { SFC } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ExchangeContainer from './containers/ExchangeContainer'
import { store } from './store'

const theme = {
    palette: {
        primary: {
            main: '#0074ea'
        }
    }
}

const App: SFC = () =>
    <Provider store={ store }>
        <ThemeProvider theme={ createMuiTheme(theme) }>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={ ExchangeContainer } />
                    <Route path='/exchange' component={ ExchangeContainer } />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>

ReactDom.render(<App />, document.getElementById('root'))
