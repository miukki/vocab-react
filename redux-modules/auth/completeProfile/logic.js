import { createLogic } from 'redux-logic'
import CustomerIamApiSdkJs from 'customer-iam-api-sdk-js'
import { NavigationActions } from 'react-navigation'
import typesSignUp from '../signUp/types'
import types from './types'
import Validator from '../../../lib/Validator'

const getJsState = function(getState) {
  return getState().toJS().completeProfile
}
const getJsStateToken = function(getState) {
  return getState().toJS().token
}

const showCompleteProfileAfterSignUp = createLogic({
  type: typesSignUp.SUBMIT_DONE,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: typesSignUp.HIDE })
    dispatch({ type: types.SHOW })
    done()
  }
})

const validate = createLogic({
  type: [types.SUBMIT],
  validate({ getState, action }, allow, reject, done) {
    const state = getJsState(getState)
    let errorTypes = []
    if (!Validator.isNameCorrect(state.name)) {
      errorTypes.push({ errorType: 'wrongName' })
    }
    if (errorTypes.length) {
      reject({ type: types.SHOW_ERROR, payload: { errorTypes } })
    }
    allow(action)
  }
})

const submitProfile = createLogic({
  type: types.SUBMIT,
  process({ customerIamApiSdkJs, Storage, getState, action }, dispatch, done) {
    //call API
    customerIamApiSdkJs
      .patchUser(getJsState(getState).name, getJsStateToken(getState).jwt)
      .then(res => {
        dispatch({
          type: types.SUBMIT_DONE
        })
        dispatch(NavigationActions.navigate({ routeName: 'Tab' }))
        done()
      })
      .catch(error => {
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
      })
  }
})

export default [validate, showCompleteProfileAfterSignUp, submitProfile]
