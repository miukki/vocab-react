import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createMockStore } from 'redux-logic-test'
import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'

import reducer, { initialState } from './'
import types from './types'
import logic from './logic'

const rootReducer = combineReducers({ signIn: reducer })

describe('signIn', () => {
  describe('checkMobile', function() {
    it('reject action when mobile length wrong', function(done) {
      const store = createMockStore({
        initialState: fromJS({
          signIn: initialState.set('mobile', '1800000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {}
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('allow action when mobile OK', function(done) {
      const signIn = jest.fn()
      signIn.mockReturnValue(Promise.resolve({ data: { token: 'jwt-token' } }))

      const setJWT = jest.fn()
      setJWT.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          signIn: initialState.set('mobile', '18000000000')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { signIn }, Storage: { setJWT } }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })

  describe('requestJWT', () => {
    it('request JWT from API and set it to storage', done => {
      const signIn = jest.fn()
      signIn.mockReturnValue(Promise.resolve({ data: { token: 'jwt-token' } }))

      const setJWT = jest.fn()
      setJWT.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          signIn: initialState
            .set('mobile', '18000000000')
            .set('password', 'Qweasdzxc123!!!')
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: { customerIamApiSdkJs: { signIn }, Storage: { setJWT } }
      })

      store.dispatch({
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(signIn.mock.calls[0]).toMatchSnapshot()
        expect(setJWT.mock.calls[0]).toMatchSnapshot()
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when networkError', done => {
      const signIn = jest.fn()
      signIn.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.NETWORK_ERROR)
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
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when serverError', done => {
      const signIn = jest.fn()
      signIn.mockReturnValue(
        Promise.reject(CustomerIamApiSdkJs.ERRORS.SERVER_ERROR)
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
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })

    it('dispatch SHOW_ERROR when userPasswordMismatch', done => {
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
        type: types.SUBMIT
      })

      store.whenComplete().then(() => {
        expect(store.actions).toMatchSnapshot()
        done()
      })
    })
  })
})
