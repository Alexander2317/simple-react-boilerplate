import { createSelector } from 'reselect'

export const getAccountPerson = (state) => state.accountPerson
export const accountPersonSelector = createSelector(
  getAccountPerson,
  (person) => person.get('entities').toJS()
)
