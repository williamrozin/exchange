import {  Typography } from '@material-ui/core'
import format from 'date-fns/format'
import React, { SFC } from 'react'
import { IState } from '../../store/state'

interface IProps {
    lastUpdate: IState['quotation']['lastUpdate']
}

const LastUpdate: SFC<IProps> = ({ lastUpdate }) =>
    <Typography
        align='center'
        variant='caption'
        style={ { paddingTop: '18px' } }>
        { `Last updated at ${format(new Date(lastUpdate), 'HH:mm, DD MMM YYYY')}` }
    </Typography>

export default LastUpdate
