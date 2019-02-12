import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import React, { ReactNode, SFC } from 'react'
import styled from 'styled-components'

interface IProps {
    children: ReactNode
}

const Container = styled.div``

const Content = styled.div`
    margin: 0 auto;
    width: calc(100% - 48px);
    max-width: 900px;
    padding: 24px;
`

const Logo = styled.div`
    flex: 1;
`

const Main: SFC<IProps> = (props) =>
    <Container>
        <AppBar
            position='sticky'
            style={ {
                background: '#FFFFFF',
                borderBottom: '1px solid silver',
                boxShadow: 'none'
            } }>
            <Toolbar>
                <Logo>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/d/d6/Revolut.svg'
                    height='36px'
                    draggable={ false }
                />
                </Logo>
                <ListItem button style={ { width: 'auto', maxWidth: '320px' } }>
                    <ListItemAvatar>
                        <Avatar src='https://picsum.photos/200/200/?random'>
                            W
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary='William Rozin Gaspar'
                        secondary='williamrozingaspar@gmail.com'
                    />
                </ListItem>
            </Toolbar>
        </AppBar>
        <Content>
            { props.children }
        </Content>
    </Container>

export default Main
