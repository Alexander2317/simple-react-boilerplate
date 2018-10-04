import React from 'react'
import { NavLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import s from './index.css'

function Navigation() {
  return (
    <Grid container alignItems="center" className={s.container}>
      <Grid item>
        <NavLink exact to="/" activeClassName={s.active} className={s.link}>
          CUSTOMER ACCOUNT
        </NavLink>
      </Grid>
      <Grid item>
        <NavLink
          exact
          to="/payment"
          activeClassName={s.active}
          className={s.link}
        >
          PAYMENT SELECTION
        </NavLink>
      </Grid>
    </Grid>
  )
}

export default Navigation
