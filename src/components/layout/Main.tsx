import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import React, { ReactNode, SFC } from 'react'
import styled from 'styled-components'

interface IProps {
    children: ReactNode
}

const Header = styled(AppBar)`
    background: #FFFFFF !important;
    box-shadow: none !important;
    border-bottom: 1px solid #0074EA;
`

const Main: SFC<IProps> = (props) =>
    <div>
        <Header position='sticky'>
            <Toolbar>
                <Typography>Home</Typography>
            </Toolbar>
        </Header>
        { props.children }
    </div>

export default Main
