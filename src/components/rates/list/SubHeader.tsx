import { ListSubheader } from '@material-ui/core'
import React, { SFC } from 'react'

interface IProps {
    title: string
}

const SubHeader: SFC<IProps> = (props) =>
    <ListSubheader
        style={ {
            backgroundColor: '#FAFAFA',
            padding: '0 18px'
        } }>
        { props.title }
    </ListSubheader>

export default SubHeader
