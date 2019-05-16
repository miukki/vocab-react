// @flow
import { fromJS } from 'immutable'

import * as types from './types'

const initialState = fromJS({
  items: [],
  index: 0,
  flippedItemIndex: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GENERATE_NEW:
      return state.set('items', action.payload.items)

    case types.UPDATE_INDEX:
      return state.set('index', action.payload.index)

    case types.FLIP:
      return state.set('flippedItemIndex', action.payload.index)

    default:
      return state
  }
}
