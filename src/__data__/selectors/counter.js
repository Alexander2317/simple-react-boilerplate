import { createSelector } from 'reselect'

const counterState = (state) => state.counter
const getCount = createSelector(counterState, (state) => state.count)

export { getCount }
