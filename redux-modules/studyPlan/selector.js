import models from 'eic-vocab-app-models'
import wordsLists, { all as allWords } from '../../data/words_lists'

export const selectOpts = state => {
  let { learnedWords } = state.toJS()
  const wordsList = selectWordsList(state)

  if (!wordsList) {
    return null
  }

  const wordsAmount = models.StudyPlan.getWordsAmount(
    wordsList,
    Array.from(learnedWords)
  )

  return models.StudyPlan.getOpts(wordsAmount)
}

export const selectWordsList = state => {
  const wordsListUid = selectWordsListUid(state)
  return Array.from(wordsLists.get(wordsListUid))
}

// picker choices data

export const selectDailyWordsAmounts = state =>
  Array.from(selectOpts(state).keys())

export const selectDaysAmounts = state =>
  selectOpts(state)
    ? Array.from(new Set(selectOpts(state).values()).add(1))
    : []

// picker selected value

export const selectPickerDailyWordsAmount = state =>
  state.toJS().picker.dailyWordsAmount

export const selectPickerDaysAmount = state => {
  const opts = selectOpts(state)
  const dailyWordsAmount = selectPickerDailyWordsAmount(state)
  if (!opts) {
    return NaN
  }
  return models.StudyPlan.getDaysAmount(selectOpts(state), dailyWordsAmount)
}

// panel info

export const selectDailyWordsAmount = state => {
  return (
    state.toJS().dailyWordsAmountOfWordsList[selectWordsListUid(state)] || 15
  )
}

export const selectWordsListUid = state => {
  let { wordsListUid } = state.toJS()

  if (Array.from(wordsLists.keys()).indexOf(wordsListUid) === -1) {
    return Array.from(wordsLists.keys())[0] // get first by default
  }

  return wordsListUid
}

export const selectLearnedWords = state =>
  state.toJS().learnedWords ? Array.from(state.toJS().learnedWords) : []

export const selectLearnedWordsInWordsList = state => {
  const wordsList = selectWordsList(state)
  return selectLearnedWords(state).filter(w => {
    return (
      Array.from(wordsList)
        .map(w => w.wordStr)
        .indexOf(w) !== -1
    )
  })
}

export const selectCheckinLogs = state =>
  state.toJS().checkinLogs
    ? Array.from(
        new Set(
          Array.from(state.toJS().checkinLogs)
            .filter(log => log)
            .map(log => log.substr(0, 8))
        )
      )
    : []

export const selectWordsListAmount = state => {
  const wordsList = selectWordsList(state)
  if (!wordsList) {
    return 0
  }
  return wordsList.length
}

export const selectDaysLeft = state => {
  const opts = selectOpts(state)
  const dailyWordsAmount = selectDailyWordsAmount(state)
  if (!opts) {
    return NaN
  }
  const daysLeft = models.StudyPlan.getDaysAmount(
    selectOpts(state),
    dailyWordsAmount
  )
  return daysLeft ? daysLeft : 1
}

export const selectShowDaysPicker = state => state.toJS().showDaysPicker

export const selectLearnedWordObjects = state => {
  const learnedWords = selectLearnedWords(state)
  return allWords.filter(word => {
    return learnedWords.indexOf(word.wordStr) !== -1
  })
}

export const selecteDailyGoalComplete = state => {
  return selectLearnedWordsOfCompletePractice(state) !== null
}

export const selectLearnedWordsOfCompletePractice = state => {
  const checkinLogs = state.toJS().checkinLogs
  const wordsListUid = state.toJS().wordsListUid
  const dateStringOfToday = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')
  const searchString = dateStringOfToday + '$' + wordsListUid
  const found = Array.from(checkinLogs)
    .filter(log => log)
    .filter(log => log.indexOf(searchString) !== -1)[0]

  if (!found) {
    return null // checkin log not found
  }

  let [date, listName, wordsAmount] = found.split('$')
  return Number.parseInt(wordsAmount)
}

export const selectWordsListComplete = state =>
  selectLearnedWordsInWordsList(state).length === selectWordsListAmount(state)
