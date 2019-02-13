import { createMuiTheme } from '@material-ui/core'
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import React, { SFC } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ExchangeContainer from './containers/ExchangeContainer'
import HomeContainer from './containers/HomeContainer'
import NotFoundContainer from './containers/NotFoundContainer'
import RatesContainer from './containers/RatesContainer'
import { store } from './store'

const theme = {
    palette: {
        primary: {
            main: '#088BCD'
        }
    }
}

const App: SFC = () =>
    <Provider store={ store }>
        <ThemeProvider theme={ createMuiTheme(theme) }>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ HomeContainer } />
                    <Route exact path='/exchange' component={ ExchangeContainer } />
                    <Route exact path='/rates' component={ RatesContainer } />
                    <Route component={ NotFoundContainer } />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>

ReactDom.render(<App />, document.getElementById('root'))
