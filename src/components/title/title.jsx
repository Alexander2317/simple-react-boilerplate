// @flow

import * as React from 'react'

type Props = {
  text: string,
}

const Title = ({ text }: Props): React.Node => <h1>{text}</h1>

export default Title
