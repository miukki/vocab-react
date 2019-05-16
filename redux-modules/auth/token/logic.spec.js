import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createMockStore } from 'redux-logic-test'
import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'

import reducer, { initialState } from './'
import types from './types'
import logic from './logic'

const rootReducer = combineReducers({ signIn: reducer })

describe('Token', () => {
  describe('delete JWT', () => {
    it('dispatch RESET_STATE when signOut', done => {
      const signIn = jest.fn()
      signIn.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.USER_PASSWORD_DISMATCH)
      )

      const store = createMockStore({
        initialState: fromJS({
          signIn: initialState
            .set('mobile', '18000000000')
            .set('password', 'Qweasdzxc123!!!')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { signIn } }
      })

      store.dispatch({
        type: types.DELETE_JWT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })
})
