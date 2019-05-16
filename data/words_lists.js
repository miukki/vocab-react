const ieltsListening = require('./ielts_listening.json')
const ieltsReading = require('./ielts_reading.json')
const ieltsWriting = require('./ielts_writing.json')
const ieltsSpeaking = require('./ielts_speaking.json')

const toeflListening = require('./toefl_listening.json')
const toeflReading = require('./toefl_reading.json')
const toeflWriting = require('./toefl_writing.json')
const toeflSpeaking = require('./toefl_speaking.json')

let wordsLists = new Map()
wordsLists.set('IELTS Listening', ieltsListening)
wordsLists.set('IELTS Reading', ieltsReading)
wordsLists.set('IELTS Writing', ieltsWriting)
wordsLists.set('IELTS Speaking', ieltsSpeaking)

wordsLists.set('TOEFL Listening', toeflListening)
wordsLists.set('TOEFL Reading', toeflReading)
wordsLists.set('TOEFL Writing', toeflWriting)
wordsLists.set('TOEFL Speaking', toeflSpeaking)

export default wordsLists
export const all = [
  ...ieltsListening,
  ...ieltsReading,
  ...ieltsWriting,
  ...ieltsSpeaking,

  ...toeflListening,
  ...toeflReading,
  ...toeflWriting,
  ...toeflSpeaking
]
