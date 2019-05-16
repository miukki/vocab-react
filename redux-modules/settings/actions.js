import * as types from './types'

export const updateLocation = location => {
  return {
    type: types.UPDATE_LOCATION,
    payload: { location }
  }
}
