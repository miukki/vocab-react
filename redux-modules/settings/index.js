import { fromJS } from 'immutable'
import * as types from './types'
import * as actions from './actions'

export const initialState = fromJS({
  location: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return state.set('location', action.payload.location)

    default:
      return state
  }
}
