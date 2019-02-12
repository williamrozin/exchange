import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import React, { Component, ReactNode } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'

interface IProps extends RouteComponentProps<{}> {
    children: ReactNode
}

const Container = styled.div``

const Content = styled.div`
    margin: 0 auto;
    width: calc(100% - 48px);
    max-width: 900px;
    padding: 24px;
`

const Menu = styled.div`
    flex: 1;
    display: flex;
`

class Main extends Component<IProps> {
    public handleGoTo = (url: string) => () => {
        this.props.history.push(url)
    }

    public render() {
        return (
            <Container>
                <AppBar
                    position='sticky'
                    style={ {
                        background: '#FFFFFF',
                        borderBottom: '1px solid silver',
                        boxShadow: 'none'
                    } }>
                    <Toolbar>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/d/d6/Revolut.svg'
                            height='36px'
                            draggable={ false }
                        />
                        <Menu>
                            <Button
                                color='primary'
                                style={ {
                                    fontWeight: 600,
                                    marginLeft: '24px',
                                    textTransform: 'none'
                                } }
                                onClick={ this.handleGoTo('/') }>
                                Home
                            </Button>
                            <Button
                                color='primary'
                                style={ {
                                    fontWeight: 600,
                                    marginLeft: '12px',
                                    textTransform: 'none'
                                } }
                                onClick={ this.handleGoTo('/exchange') }>
                                Exchange
                            </Button>
                            <Button
                                color='primary'
                                style={ {
                                    fontWeight: 600,
                                    marginLeft: '12px',
                                    textTransform: 'none'
                                } }
                                onClick={ this.handleGoTo('/rates') }>
                                Rates
                            </Button>
                        </Menu>
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
                    { this.props.children }
                </Content>
            </Container>
        )
    }
}

export default withRouter(Main)
