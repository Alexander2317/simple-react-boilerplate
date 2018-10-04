import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { dataProductCard } from '../../mocks'
import ProductCard from '../ProductCard'
import CalculatingParams from './CalculatingParams'
import { Title } from '../Typography'
import s from './index.css'

class Sidebar extends Component {
  renderCard = () => {
    return dataProductCard.map(({ id, img, title, desc, price }) => (
      <ProductCard key={id} img={img} title={title} desc={desc} price={price} />
    ))
  }

  render() {
    return (
      <aside className={s.aside}>
        <Title classes={s.title}>Shopping Cart</Title>

        <section className={s.containerProduct}>{this.renderCard()}</section>

        <section className={s.containerProduct}>
          <CalculatingParams />
        </section>

        <article className={s.item}>
          <Grid container>
            <Grid item xs={8}>
              <div className={s.calculatingTitle}>Total</div>
            </Grid>
            <Grid item xs={4}>
              <div className={s.calculatingPrice}>$&nbsp;488.84</div>
            </Grid>
          </Grid>
        </article>
      </aside>
    )
  }
}

export default Sidebar
