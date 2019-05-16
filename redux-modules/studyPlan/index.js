import Expo from 'expo'
import { fromJS } from 'immutable'

import { types as logicTypes } from 'eic-vocab-app-redux-logic'
import appLogicTypes from './types'

export const initialState = fromJS({
  wordsListUid: '',
  learnedWords: new Set(),
  checkinLogs: new Set(),
  dailyWordsAmountOfWordsList: {},
  picker: { dailyWordsAmount: 15 },
  currentDate: null
})

export default (state = initialState, action) => {
  switch (action.type) {
    case appLogicTypes.UPDATE_CURRENT_DATE:
      return state.set('currentDate', new Date().toISOString().substr(0, 10))

    case appLogicTypes.LOAD_SAVED_DATA_DONE:
      // TODO: fix if saved data lack
      const newData = { ...state.toJS(), ...action.payload }
      let {
        learnedWords,
        checkinLogs,
        dailyWordsAmountOfWordsList,
        wordsListUid
      } = newData
      return state
        .set('wordsListUid', wordsListUid)
        .set('learnedWords', fromJS(new Set(learnedWords)))
        .set('checkinLogs', fromJS(new Set(checkinLogs)))
        .set('dailyWordsAmountOfWordsList', fromJS(dailyWordsAmountOfWordsList))
        .set(
          'picker',
          fromJS({
            dailyWordsAmount: dailyWordsAmountOfWordsList[wordsListUid]
          })
        )

    // modify user data
    case appLogicTypes.UPDATE_USER_DATA:
      return state
        .set(
          'dailyWordsAmountOfWordsList',
          action.payload.dailyWordsAmountOfWordsList
        )
        .set('wordsListUid', action.payload.wordsListUid)
        .set('learnedWords', action.payload.learnedWords)
        .set('checkinLogs', action.payload.checkinLogs)

    // picker
    case appLogicTypes.UPDATE_PICKER_DAILY_WORDS_AMOUNT:
      return state.set(
        'picker',
        state
          .get('picker')
          .set('dailyWordsAmount', action.payload.dailyWordsAmount)
      )

    case appLogicTypes.UPDATE_PICKER_DAYS_AMOUNT:
      return state.set(
        'picker',
        state.get('picker').set('daysAmount', action.payload.daysAmount)
      )

    default:
      return state
  }
}
