import { Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import React, { ReactNode, SFC } from 'react'

interface IProps {
    children: ReactNode
}

const Main: SFC<IProps> = (props) =>
    <div>
        <AppBar
            position='sticky'
            style={ {
                background: '#FFFFFF',
                borderBottom: '1px solid silver',
                boxShadow: 'none'
            } }>
            <Toolbar>
                <Typography>Home</Typography>
            </Toolbar>
        </AppBar>
        { props.children }
    </div >

export default Main
