import { createLogic } from 'redux-logic'
import * as types from './types'

const saveLocation = createLogic({
  type: [types.UPDATE_LOCATION],
  process({ getState, action, Storage, vocabAppServiceJsSdk }, dispatch, done) {
    const location = action.payload.location
    try {
      vocabAppServiceJsSdk.updateLocation(getState().toJS().token.jwt, location)
    } catch (error) {
      // do nothing
    }

    Storage.setLocation(location).then(done)
  }
})

export default [saveLocation]
