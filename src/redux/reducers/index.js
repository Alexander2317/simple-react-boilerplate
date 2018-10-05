import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'
import { reducer as accountPerson } from './accountPerson'

export default combineReducers({
  router,
  form,
  accountPerson
})
