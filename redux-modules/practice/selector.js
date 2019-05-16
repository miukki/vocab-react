// process state
export const selectRemain = state => state.toJS().remain
export const selectPlanAmount = state => state.toJS().planAmount
export const selectShowingResult = state => state.toJS().showingResult
export const selectComplete = state => state.toJS().complete

// qustion
export const selectWordStr = state => state.toJS().wordStr
export const selectPartsOfSpeech = state => state.toJS().partsOfSpeech
export const selectPhoneticSymbol = state => state.toJS().phoneticSymbol

// alternatives
export const selectAnswers = state => state.toJS().answers

// user choice
export const selectSelected = state => state.toJS().selected
