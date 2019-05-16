import { combineReducers } from 'redux-immutable'
import { reducer as homeNav } from '../routers/HomeNav'
import { reducer as rootNav } from '../routers/Root'
import { reducer as tabNav } from '../routers/Tab'

import practice from '../redux-modules/practice'
import wordlist from '../redux-modules/wordlist'
import flashCards from '../redux-modules/flashCards'
import studyPlan from '../redux-modules/studyPlan'

import signIn from '../redux-modules/auth/signIn/'
import signUp from '../redux-modules/auth/signUp/'
import forgotPassword from '../redux-modules/auth/forgotPassword/'
import completeProfile from '../redux-modules/auth/completeProfile/'
import token from '../redux-modules/auth/token/'
import settings from '../redux-modules/settings'

const rootReducer = combineReducers({
  settings,
  token,
  signIn,
  signUp,
  forgotPassword,
  completeProfile,
  homeNav,
  rootNav,
  tabNav,
  practice,
  wordlist,
  flashCards,
  studyPlan
})

export default rootReducer
