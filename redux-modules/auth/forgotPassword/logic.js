/* global setTimeout process */
/* global clearTimeout process */

import { createLogic } from 'redux-logic'
import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'
import { NavigationActions } from 'react-navigation'
import * as tokenActions from '../token/actions'
import types from './types'
import Validator from '../../../lib/Validator'

const getJsState = function(getState) {
  return getState().toJS().forgotPassword
}

const dispatchCountdownVcode = createLogic({
  type: [types.SEND_VCODE_DONE],
  process({ getState, action }, dispatch, done) {
    dispatch({ type: types.COUNTDOWN_VCODE })
    done()
  }
})

const validate = createLogic({
  type: [types.SUBMIT],
  validate({ getState, action }, allow, reject, done) {
    const state = getJsState(getState)
    let errorTypes = []
    if (!Validator.isVcodeCorrect(state.vcode)) {
      errorTypes.push({ errorType: 'wrongVcode' })
    }
    if (!Validator.isMobileNumberCorrect(state.mobile)) {
      errorTypes.push({ errorType: 'wrongMobile' })
    }
    if (!Validator.isStrongPassword(state.password)) {
      errorTypes.push({ errorType: 'weakPassword' })
    }
    if (errorTypes.length) {
      reject({ type: types.SHOW_ERROR, payload: { errorTypes } })
    }
    allow(action)
  }
})

const validateVCode = createLogic({
  type: [types.SEND_VCODE],
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

const sendVcode = createLogic({
  type: [types.SEND_VCODE],
  process({ customerIamApiSdkJs, getState, action }, dispatch, done) {
    customerIamApiSdkJs
      .sendSMS(getJsState(getState).mobile)
      .then(res => {
        dispatch({
          type: types.SEND_VCODE_DONE
        })
        done()
      })
      .catch(error => {
        // setTimeout(() => {
        if (error === CustomerIamApiSdkJs.ERRORS.HIT_RATE_LIMIT) {
          let errorTypes = []
          errorTypes.push({ errorType: 'hitRateLimit' })
          dispatch({
            type: types.SHOW_ERROR,
            payload: { errorTypes }
          })
          return done()
        }

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

const resetPassword = createLogic({
  type: types.SUBMIT,
  process({ customerIamApiSdkJs, Storage, getState, action }, dispatch, done) {
    // TODO: this is a workaround
    // because the validtion doesn't work properly to reject sign up submit
    if (getJsState(getState).mobile.length !== 11) {
      return done()
    }
    customerIamApiSdkJs
      .resetPassword(
        getJsState(getState).vcode,
        getJsState(getState).mobile,
        getJsState(getState).password
      )
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
        if (error === CustomerIamApiSdkJs.ERRORS.VERIFICATION_CODE_ERROR) {
          let errorTypes = []
          errorTypes.push({ errorType: 'wrongVcode' })
          dispatch({
            type: types.SHOW_ERROR,
            payload: { errorTypes }
          })
          return done()
        }

        if (error === CustomerIamApiSdkJs.ERRORS.USER_NOT_EXIST) {
          let errorTypes = []
          errorTypes.push({ errorType: 'userNotExist' })
          dispatch({
            type: types.SHOW_ERROR,
            payload: { errorTypes }
          })
          return done()
        }

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

export default [resetPassword, validate, validateVCode, sendVcode]
