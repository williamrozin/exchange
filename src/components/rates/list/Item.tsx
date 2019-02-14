import { ListItem } from '@material-ui/core'
import React, { ReactNode, SFC } from 'react'

interface IProps {
    index: number
    children: ReactNode
}

const Item: SFC<IProps> = (props) =>
    <ListItem
        style={ {
            backgroundColor: props.index % 2 === 0
                ? '#EEEEEE'
                : '#F5F5F5'
        } }>
        { props.children }
    </ListItem>

export default Item
