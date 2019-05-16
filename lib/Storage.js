import Expo from 'expo'

export default class Storage {
  static getLocation() {
    return Expo.SecureStore.getItemAsync('location')
  }

  static setLocation(location) {
    return Expo.SecureStore.setItemAsync('location', location)
  }

  static getJWT() {
    return Expo.SecureStore.getItemAsync('jwt')
  }

  static setJWT(jwt) {
    return Expo.SecureStore.setItemAsync('jwt', jwt)
  }

  static deleteJWT() {
    return Expo.SecureStore.deleteItemAsync('jwt')
  }

  static getStudyPlan() {
    return Expo.SecureStore.getItemAsync('studyPlan').then(results => {
      if (!results) {
        return false // return false when data never save
      }

      let {
        learnedWords,
        checkinLogs,
        wordsListUid,
        dailyWordsAmountOfWordsList
      } = JSON.parse(results)

      return {
        learnedWords,
        checkinLogs,
        wordsListUid,
        dailyWordsAmountOfWordsList
      }
    })
  }

  static saveStudyPlan({
    learnedWords,
    checkinLogs,
    wordsListUid,
    dailyWordsAmountOfWordsList
  }) {
    const json = JSON.stringify({
      learnedWords: Array.from(learnedWords),
      checkinLogs: Array.from(checkinLogs),
      wordsListUid,
      dailyWordsAmountOfWordsList
    })
    return Expo.SecureStore.setItemAsync('studyPlan', json)
  }
}
