import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import s from './index.css'

const theme = createMuiTheme()

function Layout(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Grid
        className={s.container}
        container
        direction="row"
        justify="space-between"
      >
        <Grid item lg={8} xs={12} md={8} sm={12}>
          <Navigation />

          {props.children}
        </Grid>
        <Grid item lg={4} xs={12} md={4} sm={12}>
          <Sidebar />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}

export default Layout
