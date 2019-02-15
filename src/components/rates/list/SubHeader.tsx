import { ListSubheader } from '@material-ui/core'
import React, { SFC } from 'react'

interface IProps {
    title: string
}

const SubHeader: SFC<IProps> = (props) =>
    <ListSubheader
        style={ {
            backgroundColor: '#FAFAFA',
            flex: 1,
            padding: 0
        } }>
        { props.title }
    </ListSubheader>

export default SubHeader
