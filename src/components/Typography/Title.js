import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import s from './index.css'

function Title(props) {
  return <div className={cx(s.title, props.classes)}>{props.children}</div>
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default Title
