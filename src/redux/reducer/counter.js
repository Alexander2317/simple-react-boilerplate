import { actionTypes } from '../constants'

const initialState = {
  count: 1,
}

const counter = (state = initialState, action) => {
  const { type, payload } = action

  if (type === actionTypes.COUNTER_UPDATE) {
    return {
      ...state,
      count: payload.count,
    }
  }

  return state
}

export default counter
