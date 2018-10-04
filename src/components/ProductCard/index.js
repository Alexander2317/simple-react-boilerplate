import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import s from './index.css'

function ProductCard(props) {
  const { img, title, desc, price } = props

  return (
    <Grid container className={s.item}>
      <Grid item xs={3}>
        <div className={s.img} style={{ backgroundImage: `url(${img})` }} />
      </Grid>
      <Grid item xs={6}>
        <div className={s.title}>{title}</div>
        <div className={s.desc}>{desc}</div>
        <div className={s.price}>
          $&nbsp;
          {price}
        </div>
      </Grid>
    </Grid>
  )
}

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default ProductCard
