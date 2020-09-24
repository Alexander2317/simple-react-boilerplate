// @flow

import * as React from 'react'

import style from './style.css'

type Props = {
  id: number,
}

const Some = ({ id }: Props) => <div>{id}</div>

const App = (): React.Node => (
  <div className={style.container}>
    test <Some id={123} />
  </div>
)

export default App
