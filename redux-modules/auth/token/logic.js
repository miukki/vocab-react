// import { NavigationActions } from 'react-navigation'
import { createLogic } from 'redux-logic'
import typesSignUp from '../signUp/types'
import typesSignIn from '../signIn/types'
import typesCompleteProfile from '../completeProfile/types'
import typesForgotPassword from '../forgotPassword/types'
import types from './types'
import { Navigator } from '../../../routers/Root'

const signUpShow = createLogic({
  type: types.DELETE_JWT,
  process({ getState, action }, dispatch, done) {
    dispatch(Navigator.router.getActionForPathAndParams('Login'))
    dispatch({
      type: typesSignUp.RESET_STATE
    })
    dispatch({
      type: typesForgotPassword.RESET_STATE
    })
    dispatch({
      type: typesCompleteProfile.RESET_STATE
    })
    dispatch({
      type: typesSignIn.RESET_STATE
    })
    done()
  }
})

export default [signUpShow]
