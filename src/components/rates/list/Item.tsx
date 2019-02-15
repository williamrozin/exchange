import { ListItem } from '@material-ui/core'
import React, { ReactNode, SFC } from 'react'
import styled from 'styled-components'

interface IProps {
    index: number
    children: ReactNode
}

interface IWrapper {
    index: IProps['index']
}

const Wrapper = styled.div<IWrapper>`
    cursor: pointer;
    && {
        .list-item {
            background-color: ${(props) => props.index % 2 === 0
                ? '#EEEEEE'
                : '#F5F5F5'
            };
        }

        &:hover {
            .list-item {
                background-color: #E0E0E0;
            }
        }
    }
`

const Item: SFC<IProps> = (props) =>
    <Wrapper index={ props.index }>
        <ListItem className='list-item'>
            { props.children }
        </ListItem>
    </Wrapper>

export default Item
