import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createMockStore } from 'redux-logic-test'

import reducer, { initialState } from './'
import * as types from './types'
import logic from './logic'

const rootReducer = combineReducers({ settings: reducer })

describe('settings', () => {
  describe('saveLocation', function() {
    it('set location to storage', done => {
      const setLocation = jest.fn()
      setLocation.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          settings: initialState.set('location', null)
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { Storage: { setLocation } }
      })

      store.dispatch({
        type: types.UPDATE_LOCATION,
        payload: { location: 'fake_location' }
      })

      store.whenComplete().then(() => {
        expect(setLocation.mock.calls[0]).toMatchSnapshot()
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })
})
