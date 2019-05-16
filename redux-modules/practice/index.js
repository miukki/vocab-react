import Expo from 'expo'
import { fromJS } from 'immutable'

import { types as logicTypes } from 'eic-vocab-app-redux-logic'

const initialState = fromJS({
  selected: null,
  answers: [],
  wordStr: 'wordStr_0',
  partsOfSpeech: 'partsOfSpeech_0',
  phoneticSymbol: 'phoneticSymbol_0'
})

const practice = (state = initialState, action) => {
  switch (action.type) {
    case logicTypes.START_NEW_PRACTICE:
      return state.set('complete', false).set('planAmount', 0)

    case logicTypes.SHOW_RESULT:
      return state
        .set(
          'selected',
          state
            .get('answers')
            .indexOf(
              state
                .get('answers')
                .find(answer => answer.text === action.answeredDefinition)
            )
        )
        .set(
          'answers',
          state.get('answers').map(answer => {
            if (answer.text === action.correctDefinition) {
              answer.isRight = true
            }
            return answer
          })
        )
        .set('remain', action.remain)
        .set('showingResult', true)

    case logicTypes.GET_NEXT_QUESTION:
      if (!state.get('planAmount')) {
        state = state.set('planAmount', action.practice.remain)
      }
      state = state.set('remain', action.practice.remain)
      state = state.set('practice', action.practice)
      return state

    case logicTypes.SHOW_QUESTION:
      if (action.question === null) {
        return state.set('complete', true)
      }

      Expo.Speech.speak(action.question.wordStr, { language: 'en' })

      return state
        .set('selected', null)
        .set(
          'answers',
          action.question.alternatives.map(item => {
            return { text: item }
          })
        )
        .set('wordStr', action.question.wordStr)
        .set('partsOfSpeech', action.question.partsOfSpeech)
        .set('phoneticSymbol', action.question.phoneticSymbol)
        .set('showingResult', false)

    default:
      return state
  }
}

export default practice
