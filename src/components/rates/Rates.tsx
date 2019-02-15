import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { ChangeEvent, Component } from 'react'
import styled from 'styled-components'
import { TCurrency } from '../../actions/quotation-actions'
import { ALL_CURRENCIES } from '../../constants/currencies'
import { IProps } from '../../containers/RatesContainer'
import { Content } from '../exchange/Exchange'
import LastUpdate from './LastUpdate'
import RateList from './RateList'

interface IState {
    showFields: boolean
    showAdd: boolean
    base: TCurrency | ''
    target: TCurrency | ''
    errors: Array<'base' | 'target'>
}

const Wrapper = styled.div`
    padding: 18px;
    flex: 1;
`

const Form = styled.form`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-gap: 18px;
`

const Actions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 18px;
    margin-top: 18px;
`

class Rates extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            base: '',
            errors: [],
            showAdd: true,
            showFields: false,
            target: ''
        }
    }

    public handleHideAdd = () => {
        this.setState({ showAdd: false })
    }

    public handleShowFields = () => {
        this.setState({ showFields: true })
    }

    public handleShowAdd = () => {
        this.setState({
            base: '',
            errors: [],
            showAdd: true,
            target: '',
        })
    }

    public handleHideFields = () => {
        this.setState({ showFields: false })
    }

    public handleChange =
        (type: 'base' | 'target') =>
        (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as TCurrency
        const errors = this.state.errors
            .filter((error) => error !== type)

        if (type === 'base') {
            this.setState({ base: value, errors })
        } else {
            this.setState({ target: value, errors })
        }
    }

    public handleConfirm = () => {
        const { base, target } = this.state

        if (base && target) {
            this.props.onAddRate({ base, target })
            this.handleHideFields()
        } else {
            const errors = [
                base ? undefined : 'base' as 'base',
                target ? undefined : 'target' as 'target'
            ].filter(Boolean)

            this.setState({ errors })
        }
    }

    public renderList() {
        return (
            <RateList
                base={ this.props.base }
                target={ this.props.target }
                refreshing={ this.props.refreshing }
                rates={ this.props.rates }
                quotation={ this.props.quotation }
                onRemoveRate={ this.props.onRemoveRate }
            />
        )
    }

    public renderField(type: 'base' | 'target') {
        return (
            <TextField
                select
                fullWidth
                required
                error={ this.state.errors.includes(type) }
                variant='outlined'
                value={ this.state[type] }
                label={ `Select currency ${type === 'base' ? '1' : '2'}` }
                onChange={ this.handleChange(type) }>
                {
                    ALL_CURRENCIES.map((currency) =>
                        <MenuItem
                            key={ currency.value }
                            value={ currency.value }>
                            { currency.value } - { currency.label }
                        </MenuItem>
                    )
                }
            </TextField>
        )
    }

    public renderFields() {
        return (
            <Collapse
                in={ this.state.showFields }
                onExited={ this.handleShowAdd }>
                <Typography
                    align='center'
                    variant='subheading'
                    color='textSecondary'
                    style={ { paddingBottom: '18px' } }>
                    Add new currency
                </Typography>
                <Form>
                    { this.renderField('base') }
                    { this.renderField('target') }
                </Form>
                <Actions>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={ this.handleHideFields }>
                        Cancel
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={ this.handleConfirm }>
                        Confirm
                    </Button>
                </Actions>
            </Collapse>
        )
    }

    public renderRates() {
        return (
            <Content>
                <Typography
                    align='center'
                    variant='h5'
                    color='textSecondary'
                    style={ { paddingTop: '18px' } }>
                    Rates
                </Typography>
                <Wrapper>
                    { this.renderFields() }
                    <Collapse
                        in={ this.state.showAdd }
                        onExited={ this.handleShowFields }>
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={ this.handleHideAdd }>
                            Add new currency
                        </Button>
                    </Collapse>
                </Wrapper>
                { this.renderList() }
            </Content>
        )
    }

    public render() {
        return (
            <>
                { this.renderRates() }
                <LastUpdate lastUpdate={ this.props.lastUpdate } />
            </>
        )
    }
}

export default Rates
