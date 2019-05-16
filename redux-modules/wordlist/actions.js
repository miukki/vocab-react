import * as types from './types'

export const selectItem = index => {
  return {
    type: types.SELECT_ITEM,
    index
  }
}
