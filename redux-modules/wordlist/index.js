import Expo from 'expo'
import { fromJS } from 'immutable'
import * as types from './types'
import { selectItem } from './actions'
import { changeWordsList } from '../studyPlan/actions'

const initialState = fromJS({
  pressable: false,
  items: []
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'Navigation/NAVIGATE':
      if (action.routeName !== 'SelectWordsList') {
        return state
      }
      return state.set('pressable', false)

    case 'Navigation/COMPLETE_TRANSITION':
      return state.set('pressable', true)

    default:
      return state
  }
}
