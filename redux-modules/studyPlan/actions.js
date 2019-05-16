import types from './types'

export const init = () => {
  return {
    type: types.LOAD_SAVED_DATA
  }
}

export const showDaysPicker = () => {
  return {
    type: types.SHOW_PICKER
  }
}

export const changeDailyWordsAmountWithoutConfirm = dailyWordsAmount => {
  return {
    type: types.UPDATE_DAILY_WORDS_AMOUNT,
    payload: { dailyWordsAmount }
  }
}

export const changeDailyWordsAmount = dailyWordsAmount => {
  return {
    type: types.UPDATE_PICKER_DAILY_WORDS_AMOUNT,
    payload: { dailyWordsAmount }
  }
}

export const changeDaysAmount = daysAmount => {
  return {
    type: types.UPDATE_PICKER_DAYS_AMOUNT,
    payload: { daysAmount }
  }
}

export const confirmDaysPicker = () => {
  return {
    type: types.CONFIRM_PICKER
  }
}

export const hideDaysPicker = () => {
  return {
    type: types.HIDE_PICKER
  }
}

export const changeWordsList = index => {
  return {
    type: types.CHANGE_WORDS_LIST,
    payload: { index }
  }
}

export const addLearnedWord = wordStr => {
  return {
    type: types.ADD_LEARNED_WORD,
    payload: { wordStr }
  }
}

export const addCheckinLog = checkinLog => {
  return {
    type: types.ADD_CHECKIN_LOG,
    payload: { checkinLog }
  }
}

export const startPractice = ({ wordsList, learnedWords, amount }) => ({
  type: '@@vocab-app-redux-logic/practice-logic/start-new-practice',
  wordsList,
  learnedWords,
  amount,
  times: 3
})

export const checkDate = () => ({ type: types.CHECK_DATE })

