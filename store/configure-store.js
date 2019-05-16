import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createLogicMiddleware } from 'redux-logic'
import logics from 'eic-vocab-app-redux-logic'
import vocabModels from 'eic-vocab-app-models'
import Immutable from 'immutable'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import rootReducer from './root-reducer'
import Storage from '../lib/Storage'
import { customerIamApiSdkJs, vocabAppServiceJsSdk } from '../lib/API'
import studyPlanReduxLogic from '../redux-modules/studyPlan/logic'
import signInReduxLogic from '../redux-modules/auth/signIn/logic'
import signUpReduxLogic from '../redux-modules/auth/signUp/logic'
import tokenReduxLogic from '../redux-modules/auth/token/logic'
import forgotPasswordReduxLogic from '../redux-modules/auth/forgotPassword/logic'
import completeProfile from '../redux-modules/auth/completeProfile/logic'
import settingsLogic from '../redux-modules/settings/logic'

const logicMiddleware = createLogicMiddleware(
  [
    ...settingsLogic,
    ...logics,
    ...studyPlanReduxLogic,
    ...signInReduxLogic,
    ...signUpReduxLogic,
    ...forgotPasswordReduxLogic,
    ...completeProfile,
    ...tokenReduxLogic
  ],
  {
    Practice: vocabModels.Practice,
    Storage,
    customerIamApiSdkJs,
    vocabAppServiceJsSdk
  }
)

const loggerMiddleware = createLogger()

const reduxMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.rootNav
)

const createStoreWithMiddleware = (rootReducer, initialState) => {
  const composeEnhancers =
    __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      __DEV__
        ? applyMiddleware(
            logicMiddleware,
            thunkMiddleware,
            reduxMiddleware,
            loggerMiddleware
          )
        : applyMiddleware(logicMiddleware, thunkMiddleware, reduxMiddleware)
    )
  )
}

const configureStore = function(initialState = Immutable.Map({})) {
  return createStoreWithMiddleware(rootReducer, initialState)
}

export default configureStore
