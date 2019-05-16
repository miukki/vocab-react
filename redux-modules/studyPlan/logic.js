/* global setInterval */

import { createLogic } from 'redux-logic'

import models from 'eic-vocab-app-models'
import { types as packageLogicTypes } from 'eic-vocab-app-redux-logic'

import types from './types'
import * as selector from './selector'
import wordsLists from '../../data/words_lists'
import StudyPlan from '../../lib/StudyPlan'

const checkDate = createLogic({
  type: types.CHECK_DATE,
  /* New option warnTimeout defaults to 60000 (ms == one minute) which warns (in development build only) when the logic exceeds the specified time without completion. Adjust this value or set it to 0 if you have logic that needs to exceed this time or purposefully never ends (like listening to a web socket) */
  warnTimeout: 0,
  process({ getState, action }, dispatch, done) {
    setInterval(() => {
      const date = new Date().toISOString().substr(0, 10)
      if (getState().toJS().studyPlan.currentDate !== date) {
        dispatch({ type: types.UPDATE_CURRENT_DATE })
      }
    }, 1000 * 60) // it check currentDate each 60 seconds to update state
  }
})

const loadSavedData = createLogic({
  type: types.LOAD_SAVED_DATA,
  process({ vocabAppServiceJsSdk, Storage, getState, action }, dispatch, done) {
    return StudyPlan.get({
      jwt: getState().toJS().token.jwt,
      vocabAppServiceJsSdk,
      Storage
    }).then(results => {
      if (results) {
        dispatch({ type: types.LOAD_SAVED_DATA_DONE, payload: results })
      }
      done()
    })
  }
})

const updateWordsList = createLogic({
  type: types.CHANGE_WORDS_LIST,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_WORDS_LIST
  },
  process({ getState, action }) {
    return {
      wordsListUid: Array.from(wordsLists.keys())[action.payload.index]
    }
  }
})

const adjustDailyWordsPicker = createLogic({
  type: types.UPDATE_USER_DATA,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_PICKER_DAILY_WORDS_AMOUNT
  },
  process({ getState, action }) {
    const dailyWordsAmount =
      action.payload.dailyWordsAmountOfWordsList[action.payload.wordsListUid] ||
      15
    return { dailyWordsAmount }
  }
})

const updateDailyWordsAmount = createLogic({
  type: types.CONFIRM_PICKER,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_DAILY_WORDS_AMOUNT
  },
  process({ getState, action }) {
    return {
      dailyWordsAmount: getState().toJS().studyPlan.picker.dailyWordsAmount
    }
  }
})

const updateLearnedWords = createLogic({
  type: '@@vocab-app-redux-logic/practice-logic/word-learned', // for now
  // type: types.ADD_LEARNED_WORD,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_LEARNED_WORDS
  },
  process({ getState, action }) {
    return {
      learnedWords: getState()
        .toJS()
        .studyPlan.learnedWords.add(action.wordStr) // for now
      // .studyPlan.learnedWords.add(action.payload.wordStr)
    }
  }
})

const updateCheckinLogs = createLogic({
  type: types.ADD_CHECKIN_LOG,
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_CHECKIN_LOGS
  },
  process({ getState, action }) {
    return {
      checkinLogs: getState()
        .toJS()
        .studyPlan.checkinLogs.add(action.payload.checkinLog)
    }
  }
})

const updateUserData = createLogic({
  type: [
    types.UPDATE_WORDS_LIST,
    types.UPDATE_DAILY_WORDS_AMOUNT,
    types.UPDATE_LEARNED_WORDS,
    types.UPDATE_CHECKIN_LOGS
  ],
  processOptions: {
    dispatchReturn: true,
    successType: types.UPDATE_USER_DATA
  },
  process({ getState, action }) {
    let {
      learnedWords,
      checkinLogs,
      wordsListUid,
      dailyWordsAmountOfWordsList
    } = getState().toJS().studyPlan

    if (action.payload.dailyWordsAmount) {
      dailyWordsAmountOfWordsList[wordsListUid] =
        action.payload.dailyWordsAmount
    }

    return {
      learnedWords,
      checkinLogs,
      wordsListUid,
      dailyWordsAmountOfWordsList,
      ...action.payload
    }
  }
})

const saveData = createLogic({
  type: types.UPDATE_USER_DATA,
  processOptions: {
    dispatchReturn: true,
    successType: types.SAVE_USER_DATA_DONE
  },
  process({ Storage, getState, action }) {
    return Storage.saveStudyPlan(action.payload)
  }
})

const renewPickerDailyWordsAmount = createLogic({
  // We are trying to keep previous value of dailyWordsAmount,
  // so this logic will not run when UPDATE_PICKER_DATA
  // but this may run in `checkOutRangePickerDailyWordsAmount` logic
  type: types.UPDATE_PICKER_DAYS_AMOUNT,
  process({ getState, action }, dispatch, done) {
    const opts = selector.selectOpts(getState().get('studyPlan'))

    const daysAmount = action.payload.daysAmount

    let dailyWordsAmount = models.StudyPlan.getDailyWordsAmount(
      opts,
      daysAmount
    )

    if (
      models.StudyPlan.getDaysAmount(
        opts,
        getState().toJS().studyPlan.picker.dailyWordsAmount
      ) !== daysAmount
    ) {
      dispatch({
        type: types.UPDATE_PICKER_DAILY_WORDS_AMOUNT,
        payload: { dailyWordsAmount }
      })
    }

    done()
  }
})

const renewPickerDaysAmount = createLogic({
  // We need to renew daysAmount valuse when
  // - picker data updated
  // - dailyWordsAmount changed
  type: types.UPDATE_PICKER_DAILY_WORDS_AMOUNT,
  process({ getState, action }, dispatch, done) {
    const opts = selector.selectOpts(getState().get('studyPlan'))

    const dailyWordsAmount = action.payload.dailyWordsAmount
    const daysAmount = models.StudyPlan.getDaysAmount(opts, dailyWordsAmount)

    if (getState().toJS().studyPlan.picker.daysAmount !== daysAmount) {
      dispatch({
        type: types.UPDATE_PICKER_DAYS_AMOUNT,
        payload: {
          daysAmount
        }
      })
    }

    done()
  }
})

const addCheckinLog = createLogic({
  type: packageLogicTypes.SHOW_QUESTION,
  process({ getState, action }, dispatch, done) {
    if (action.question === null) {
      dispatch({
        type: types.ADD_CHECKIN_LOG,
        payload: {
          checkinLog:
            new Date()
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, '') +
            '$' +
            getState().toJS().studyPlan.wordsListUid +
            '$' +
            selector.selectDailyWordsAmount(getState().get('studyPlan'))
        }
      })
    }
    done()
  }
})

export default [
  checkDate,
  adjustDailyWordsPicker,
  loadSavedData,
  updateWordsList,
  updateDailyWordsAmount,
  updateLearnedWords,
  updateCheckinLogs,
  updateUserData,
  saveData,
  renewPickerDailyWordsAmount,
  renewPickerDaysAmount,
  addCheckinLog
]
