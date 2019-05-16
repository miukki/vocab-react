/*global Expo */

import { types as logicTypes } from 'eic-vocab-app-redux-logic'

export const selectAnswer = index => {
  return (dispatch, getState) => {
    const practice = getState()
      .get('practice')
      .get('practice')
    const definition = getState()
      .get('practice')
      .get('answers')[index].text
    const wordStr = getState()
      .get('practice')
      .get('wordStr')
    dispatch({
      type: logicTypes.ANSWER_QUESTION,
      practice,
      definition,
      wordStr
    })
  }
}

export const getNextQuestion = () => {
  return (dispatch, getState) => {
    dispatch({
      type: logicTypes.GET_NEXT_QUESTION,
      practice: getState()
        .get('practice')
        .get('practice')
    })
  }
}

export const tellDontKnow = () => {
  return (dispatch, getState) => {
    dispatch({
      type: logicTypes.TELL_DONT_KNOW,
      practice: getState()
        .get('practice')
        .get('practice'),
      wordStr: getState()
        .get('practice')
        .get('wordStr')
    })
  }
}

export const skip = () => {
  return (dispatch, getState) => {
    dispatch({
      type: logicTypes.TELL_TOO_EASY,
      practice: getState()
        .get('practice')
        .get('practice'),
      wordStr: getState()
        .get('practice')
        .get('wordStr')
    })
  }
}

export const textToSpeech = () => {
  return (dispatch, getState) => {
    Expo.Speech.speak(
      getState()
        .get('practice')
        .get('wordStr'),
      { language: 'en' }
    )
  }
}
