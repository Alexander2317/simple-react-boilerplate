import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import s from './index.css'

class CalculatingParams extends Component {
  render() {
    return (
      <Fragment>
        <article className={s.item}>
          <Grid container>
            <Grid item xs={8}>
              <div className={s.calculatingTitle}>Subtotal</div>
            </Grid>
            <Grid item xs={4}>
              <div className={s.calculatingPrice}>$&nbsp;400</div>
            </Grid>
          </Grid>
        </article>
        <article className={s.item}>
          <Grid container>
            <Grid item xs={8}>
              <div className={s.calculatingTitle}>
                Payment processing services 1%
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={s.calculatingPrice}>$&nbsp;4</div>
            </Grid>
          </Grid>
        </article>
        <article className={s.item}>
          <Grid container>
            <Grid item xs={8}>
              <div className={s.calculatingTitle}>VAT</div>
            </Grid>
            <Grid item xs={4}>
              <div className={s.calculatingPrice}>$&nbsp;84.84</div>
            </Grid>
          </Grid>
        </article>
      </Fragment>
    )
  }
}

export default CalculatingParams
