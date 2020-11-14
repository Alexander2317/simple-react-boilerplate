// @flow

import * as React from 'react'
import { Route, Switch } from 'react-router'

import Home from './home'
import NotFound from './not-found'

import { constants } from '../__data__'

const { routes } = constants

const Pages = (): React.Node => (
  <Switch>
    <Route exact strict path={routes.home} component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default Pages
