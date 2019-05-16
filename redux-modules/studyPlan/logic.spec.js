import { fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { createMockStore } from 'redux-logic-test'

import reducer, { initialState } from './'
import types from './types'
import logic from './logic'
import * as selector from './selector'
import { types as packageLogicTypes } from 'eic-vocab-app-redux-logic'

const rootReducer = combineReducers({ studyPlan: reducer })

describe('studyPlan logic', () => {
  describe('updateUserData', function() {
    it('dispatch UPDATE_USER_DATA with new dailyWordsAmountOfWordsList when dailyWordsAmount be specified', function(done) {
      selector.selectOpts = jest.fn()
      selector.selectOpts.mockImplementation(() => new Map([[40, 100]])) // to avoid crash

      const saveStudyPlan = jest.fn()
      saveStudyPlan.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          studyPlan: {
            checkinLogs: [],
            learnedWords: [],
            wordsListUid: 'IELTS Speaking',
            picker: { dailyWordsAmount: 15 },
            dailyWordsAmountOfWordsList: { 'IELTS Writing': 20 }
          }
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {
          Storage: { saveStudyPlan }
        }
      })
      store.dispatch({
        type: types.UPDATE_DAILY_WORDS_AMOUNT,
        payload: {
          dailyWordsAmount: 40
        }
      })
      store.whenComplete().then(() => {
        expect(store.actions[1]).toMatchSnapshot()
        done()
      })
    })
  })

  describe('adjustDailyWordsPicker', function() {
    it('dispatch UPDATE_PICKER_DAILY_WORDS_AMOUNT with dailyWordsAmount of current wordsListUid', function(done) {
      selector.selectOpts = jest.fn()
      selector.selectOpts.mockImplementation(() => new Map([[20, 100]])) // to avoid crash

      const saveStudyPlan = jest.fn()
      saveStudyPlan.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          studyPlan: {
            picker: { dailyWordsAmount: 15 }
          }
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {
          Storage: { saveStudyPlan }
        }
      })
      store.dispatch({
        type: types.UPDATE_USER_DATA,
        payload: {
          wordsListUid: 'IELTS Writing',
          dailyWordsAmountOfWordsList: { 'IELTS Writing': 20 }
        }
      })
      store.whenComplete().then(() => {
        expect(store.actions[1]).toMatchSnapshot()
        done()
      })
    })

    it('dispatch UPDATE_PICKER_DAILY_WORDS_AMOUNT with default value of dailyWordsAmount when dailyWordsAmount of current wordsListUid has not been set yet', function(done) {
      selector.selectOpts = jest.fn()
      selector.selectOpts.mockImplementation(() => new Map([[15, 100]])) // to avoid crash

      const saveStudyPlan = jest.fn()
      saveStudyPlan.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          studyPlan: {
            picker: { dailyWordsAmount: 15 }
          }
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {
          Storage: { saveStudyPlan }
        }
      })
      store.dispatch({
        type: types.UPDATE_USER_DATA,
        payload: {
          wordsListUid: 'IELTS Speaking',
          dailyWordsAmountOfWordsList: { 'IELTS Writing': 20 }
        }
      })
      store.whenComplete().then(() => {
        expect(store.actions[1]).toMatchSnapshot()
        done()
      })
    })
  })

  describe('addCheckinLog', function() {
    it('dispatch ADD_CHECKIN_LOG', function(done) {
      Date.prototype.toISOString = jest.fn()
      Date.prototype.toISOString.mockReturnValue('2018-05-18')

      selector.selectOpts = jest.fn()
      selector.selectOpts.mockImplementation(() => new Map([[15, 100]])) // to avoid crash

      const saveStudyPlan = jest.fn()
      saveStudyPlan.mockReturnValue(Promise.resolve())

      const store = createMockStore({
        initialState: fromJS({
          studyPlan: {
            picker: {},
            wordsListUid: 'IELTS Listening',
            dailyWordsAmountOfWordsList: { 'IELTS Listening': 20 },
            checkinLogs: new Set(['20180501$IELTS Listening$15'])
          }
        }),
        reducer: rootReducer,
        logic,
        injectedDeps: {
          Storage: { saveStudyPlan }
        }
      })
      store.dispatch({
        type: packageLogicTypes.SHOW_QUESTION,
        question: null
      })
      store.whenComplete().then(() => {
        expect(store.actions[1]).toMatchSnapshot()
        expect(store.actions[2]).toMatchSnapshot()
        expect(store.actions[3]).toMatchSnapshot()
        done()
      })
    })
  })

  describe('checkDate', function() {
    // TODO: figure out how to test this
    // it('dispatch UPDATE_CURRENT_DATE', function(done) {
    //   Date.prototype.toISOString = jest.fn()
    //   Date.prototype.toISOString.mockReturnValue('2018-05-01')
    //   const store = createMockStore({
    //     initialState: fromJS({
    //       studyPlan: {
    //         currentDate: '2018-04-01'
    //       }
    //     }),
    //     reducer: rootReducer,
    //     logic,
    //     injectedDeps: {}
    //   })
    //   store.dispatch({
    //     type: types.CHECK_DATE
    //   })
    //   store.whenComplete().then(() => {
    //     expect(store.actions).toMatchSnapshot()
    //     done()
    //   })
    // })
  })
})
