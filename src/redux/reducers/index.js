import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as accountPerson } from './accountPerson'

export default combineReducers({
  form,
  accountPerson
})
