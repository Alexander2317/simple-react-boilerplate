// @flow

import React from 'react'
import { connect } from 'react-redux'

import { Title } from 'components'

import { updateCounter } from '../../redux/actions'
import { counter } from '../../redux/selectors'

type Props = {
  count: string,
  updateCounterAction: Function,
}

const Home = ({ count, updateCounterAction }: Props) => (
  <>
    <Title text="Hello" />
    <button type="button" onClick={updateCounterAction}>
      Update click
    </button>
    <br />
    <br />
    <div>Click {count}</div>
  </>
)

const mapStateToProps = (state) => ({ count: counter.getCount(state) })
const mapDispatchToProps = { updateCounterAction: updateCounter }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
