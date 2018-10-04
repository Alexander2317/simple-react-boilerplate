import { Record, List } from 'immutable'
import {
  ADD_PERSON_ACCOUNT_SUCCESS,
  DELETE_PERSON_ACCOUNT_SUCCESS
} from '../constants'

const ReducerState = Record({
  entities: new List([])
})

const PersonRecord = Record({
  id: null,
  name: null,
  address: null,
  cardType: null
})

export function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_ACCOUNT_SUCCESS:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload.person))
      )
    case DELETE_PERSON_ACCOUNT_SUCCESS:
      return state.update('entities', (entities) =>
        entities.filter((person) => person.get('id') !== payload.id)
      )
    default:
      return state
  }
}
