import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { connect } from 'react-redux'
import { deleteAccountPerson } from '../../redux/actions/accountPerson'
import s from './index.css'

class UserCard extends Component {
  state = {
    selectedValue: '',
    anchorEl: null
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = (event) => {
    const target = event.target
    const dataId = parseInt(target.dataset.id)

    this.props.deleteAccountPerson(dataId)
  }

  handleChange = (event) => {
    this.setState({ selectedValue: event.target.value })
  }

  render() {
    const { id, name, address, cardType } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <section className={s.item}>
        <Grid
          container
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Radio
              checked={this.state.selectedValue === 'name'}
              onChange={this.handleChange}
              color="default"
              value="name"
              name="name"
              aria-label="name"
            />
          </Grid>
          <Grid item>
            <div className={s.name}>{name}</div>
            <div className={s.desc}>
              Address: {address} <br />
              Issuing bank: {cardType}
            </div>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
              <MenuItem onClick={this.handleClose}>Edit</MenuItem>
              <MenuItem onClick={this.handleClose} data-id={id}>
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </section>
    )
  }
}

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired
}

export default connect(
  null,
  { deleteAccountPerson }
)(UserCard)
