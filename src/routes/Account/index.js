import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import { Title } from '../../components/Typography'
import UserCard from '../../components/UserCard'
import Popup from '../../components/Popup'
import { accountPersonSelector, getAccountPerson } from '../../redux/selectors'
import s from './index.css'

class Account extends Component {
  state = {
    isOpenPopup: false
  }

  handleOpenPopup = () => {
    this.setState({ isOpenPopup: true })
  }

  handleClosePopup = () => {
    this.setState({ isOpenPopup: false })
  }

  renderPersonAccount() {
    return this.props.persons.map(({ id, name, address, cardType }) => (
      <Grid key={id} className={s.itemGrid} item>
        <UserCard id={id} name={name} address={address} cardType={cardType} />
      </Grid>
    ))
  }

  render() {
    return (
      <Fragment>
        <Title classes={s.title}>Customer Account</Title>

        <Grid container alignItems="center">
          {this.props.persons.length ? this.renderPersonAccount() : null}

          <Grid item>
            <Button
              className={s.btn}
              variant="fab"
              color="primary"
              onClick={this.handleOpenPopup}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Link to="#" className={s.link}>
              <Button color="secondary">Return to Shop</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              CONTINUE TO PAYMENT
            </Button>
          </Grid>
        </Grid>

        <Popup
          isOpenPopup={this.state.isOpenPopup}
          handleClosePopup={this.handleClosePopup}
        />
      </Fragment>
    )
  }
}

export default connect((state) => {
  return { persons: accountPersonSelector(state) }
})(Account)
