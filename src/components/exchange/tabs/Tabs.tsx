import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import {
    KeyboardArrowLeft as IconLeft,
    KeyboardArrowRight as IconRight
} from '@material-ui/icons'
import React, { Component, ReactNode } from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'

interface IProps<T> {
    options: T[]
    selected: T
    secondary?: boolean
    renderTab(value: T): ReactNode
    onChangeTab(value: T): void
}

interface IContainer {
    secondary?: boolean
}

const Container = styled.div<IContainer>`
    padding: 24px;
    max-width: 900px;
    background-color: ${(props) => props.secondary
        ? '#F5F5f5'
        : '#FAFAFA'
    };
`

class Tabs<T> extends Component<IProps<T>> {
    public getIndex = () => {
        return this.props.options
            .findIndex((item: T) => this.props.selected === item)
    }

    public getPreviousIndex = () => {
        const currentIndex = this.getIndex()

        return currentIndex === 0
            ? this.props.options.length - 1
            : currentIndex - 1
    }

    public getNextIndex = () => {
        const currentIndex = this.getIndex()

        return currentIndex === this.props.options.length - 1
            ? 0
            : currentIndex + 1
    }

    public handleChangeTab = (type: 'previous' | 'next') => () => {
        const index = type === 'previous'
            ? this.getPreviousIndex()
            : this.getNextIndex()

        this.props.onChangeTab(this.props.options[index])
    }

    public render() {
        const { options, secondary, renderTab } = this.props
        const active = this.getIndex()

        return (
            <Container secondary={ secondary }>
                <SwipeableViews index={ active }>
                    { options.map(renderTab.bind(this)) }
                </SwipeableViews>
                <MobileStepper
                    style={ {
                        backgroundColor: 'transparent',
                        position: 'relative'
                    } }
                    steps={ options.length }
                    activeStep={ active }
                    backButton={
                        <Button
                            color='primary'
                            onClick={ this.handleChangeTab('previous') }>
                            <IconLeft />
                            { options[this.getPreviousIndex()] }
                        </Button>
                    }
                    nextButton={
                        <Button
                            color='primary'
                            onClick={ this.handleChangeTab('next') }>
                            { options[this.getNextIndex()] }
                            <IconRight />
                        </Button>
                    }
                />
            </Container>
        )
    }
}

export default Tabs
