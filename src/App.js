import React from 'react'
import { Route } from 'react-router-dom'
import Layout from './components/Layout'
import Account from './routes/Account/'

function App(){
  return (
    <Layout>
      <Route path="/" component={Account} exact />
    </Layout>
  )
}

export default App
