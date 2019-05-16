const prefix = 'eic-vocab-app/studyPlan'

const types = {}
types.set = function(type) {
  this[type] = `${prefix}/${type}`
}

// picker
types.set('UPDATE_PICKER_DAILY_WORDS_AMOUNT')
types.set('UPDATE_PICKER_DAYS_AMOUNT')

// user data
types.set('LOAD_SAVED_DATA')
types.set('LOAD_SAVED_DATA_DONE')

// change user data
types.set('CHANGE_WORDS_LIST')
types.set('UPDATE_WORDS_LIST')

types.set('CONFIRM_PICKER')
types.set('UPDATE_DAILY_WORDS_AMOUNT')

types.set('ADD_LEARNED_WORD')
types.set('UPDATE_LEARNED_WORDS')

types.set('ADD_CHECKIN_LOG')
types.set('UPDATE_CHECKIN_LOGS')

types.set('UPDATE_USER_DATA') // for reducer update user data state

// save user data
types.set('SAVE_USER_DATA_DONE')

// others
types.set('UPDATE_CURRENT_DATE')
types.set('CHECK_DATE')

export default types
