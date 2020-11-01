import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

const render = () => {
  const app = document.getElementById('app')

  if (!app) {
    console.error('Root element not found')
  } else {
    ReactDOM.render(<App />, app)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render()

  if (module.hot) {
    module.hot.accept('./app.jsx', render)
  }
})
