import { createLogic } from 'redux-logic'
import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'
import { NavigationActions } from 'react-navigation'
import * as tokenActions from '../token/actions'
import types from './types'
import Validator from '../../../lib/Validator'

const getJsState = function(getState) {
  return getState().toJS().signIn
}

const validate = createLogic({
  type: [types.SUBMIT],
  validate({ getState, action }, allow, reject, done) {
    const state = getJsState(getState)
    let errorTypes = []
    if (!Validator.isMobileNumberCorrect(state.mobile)) {
      errorTypes.push({ errorType: 'wrongMobile' })
    }
    if (errorTypes.length) {
      reject({ type: types.SHOW_ERROR, payload: { errorTypes } })
    }
    allow(action)
  }
})

const requestJWT = createLogic({
  type: types.SUBMIT,
  process({ customerIamApiSdkJs, Storage, getState, action }, dispatch, done) {
    customerIamApiSdkJs
      .signIn(getJsState(getState).mobile, getJsState(getState).password)
      .then(res => {
        Storage.setJWT(res.data.token).then(() => {
          dispatch({
            type: types.SUBMIT_DONE
          })

          dispatch(tokenActions.setJWT(res.data.token))
          dispatch(NavigationActions.navigate({ routeName: 'Tab' }))
          done()
        })
      })
      .catch(error => {
        // setTimeout(() => {
        if (error === CustomerIamApiSdkJs.ERRORS.NETWORK_ERROR) {
          let errorTypes = []
          errorTypes.push({ errorType: 'networkError' })
          dispatch({
            type: types.SHOW_ERROR,
            payload: { errorTypes }
          })
          return done()
        }

        if (error === CustomerIamApiSdkJs.ERRORS.SERVER_ERROR) {
          let errorTypes = []
          errorTypes.push({ errorType: 'serverError' })
          dispatch({
            type: types.SHOW_ERROR,
            payload: { errorTypes }
          })
          return done()
        }

        if (error === CustomerIamApiSdkJs.ERRORS.USER_PASSWORD_DISMATCH) {
          let errorTypes = []
          errorTypes.push({ errorType: 'userPasswordMismatch' })
          dispatch({
            type: types.SHOW_ERROR,
            payload: { errorTypes }
          })
          return done()
        }

        let errorTypes = []
        errorTypes.push({ errorType: 'otherError' })
        dispatch({
          type: types.SHOW_ERROR,
          payload: { errorTypes }
        })
        done()
        // }, 3000)
      })
  }
})

export default [validate, requestJWT]
