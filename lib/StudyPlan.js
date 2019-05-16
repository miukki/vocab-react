import VocabAppServiceJsSdk from 'vocab-app-service-js-sdk'
import wordsLists from '../data/words_lists.js'
import * as tokenActions from '../redux-modules/auth/token/actions'

const pushLearnedWords = ({ jwt, vocabAppServiceJsSdk, learnedWords }) => {
  learnedWords.forEach(async word => {
    try {
      await vocabAppServiceJsSdk.pushLearnedWord(jwt, word)
    } catch (err) {
      console.log(err)
    }
  })
}

const pushCheckinLogs = ({ jwt, vocabAppServiceJsSdk, checkinLogs }) => {
  checkinLogs.forEach(async date => {
    try {
      await vocabAppServiceJsSdk.pushCheckinLog(jwt, date)
    } catch (err) {
      console.log(err)
    }
  })
}

const getRemoteData = async ({ jwt, vocabAppServiceJsSdk }) => {
  const data = {
    learnedWords: [],
    checkinLogs: [],
    wordsListUid: ''
    // TODO: modify API first
    // dailyWordsAmountOfWordsList: {}
  }

  try {
    data.learnedWords = (await vocabAppServiceJsSdk.getLearnedWords(
      jwt
    )).data.map(w => w.wordStr)
  } catch (err) {
    console.log(err)
  }

  try {
    data.checkinLogs = (await vocabAppServiceJsSdk.getCheckinLogs(
      jwt
    )).data.map(w => w.wordStr)
  } catch (err) {
    console.log(err)
  }

  try {
    const remoteStudyPlan = (await vocabAppServiceJsSdk.getStudyPlan(jwt)).data
    data.wordsListUid = remoteStudyPlan.wordsListUid
    // TODO: modify API first
    // data.dailyWordsAmountOfWordsList = remoteStudyPlan.dailyWordsAmountOfWordsList
  } catch (err) {
    console.log(err)
  }

  return data
}

const sync = async ({ jwt, vocabAppServiceJsSdk, remote, merge }) => {
  const syncData = {
    learnedWords: merge.learnedWords.filter(
      w => remote.learnedWords.indexOf(w) === -1
    ),
    checkinLogs: merge.checkinLogs.filter(
      w => remote.checkinLogs.indexOf(w) === -1
    ),
    wordsListUid: merge.wordsListUid
    // TODO: modify API first
    // dailyWordsAmountOfWordsList: merge.dailyWordsAmountOfWordsList
  }

  try {
    await vocabAppServiceJsSdk.updateStudyPlan(
      jwt,
      syncData.wordsListUid,
      // TODO: modify API first
      15 // dailyWordsAmount is useless for app now
      // syncData.dailyWordsAmountOfWordsList
    )
  } catch (err) {
    if (err === VocabAppServiceJsSdk.ERRORS.JWT_INVALID) {
      window.store.dispatch(tokenActions.deleteJWT())
    }
    console.log('err', err)
  }

  pushLearnedWords({
    jwt,
    vocabAppServiceJsSdk,
    learnedWords: syncData.learnedWords
  })

  pushCheckinLogs({
    jwt,
    vocabAppServiceJsSdk,
    checkinLogs: syncData.checkinLogs
  })
}

export default {
  get: async ({ jwt, vocabAppServiceJsSdk, Storage }) => {
    const remote = await getRemoteData({ jwt, vocabAppServiceJsSdk })

    const local = await Storage.getStudyPlan()

    const merge = local
      ? {
          learnedWords: Array.from(
            new Set([...remote.learnedWords, ...local.learnedWords])
          ),
          checkinLogs: Array.from(
            new Set([...remote.checkinLogs, ...local.checkinLogs])
          ),
          wordsListUid: local.wordsListUid,
          dailyWordsAmountOfWordsList: local.dailyWordsAmountOfWordsList || {}
        }
      : {
          learnedWords: remote.learnedWords,
          checkinLogs: remote.checkinLogs,
          wordsListUid: remote.wordsListUid,
          // TODO: modify API first
          dailyWordsAmountOfWordsList: {}
          // dailyWordsAmountOfWordsList: ...
        }

    if (!merge.wordsListUid || merge.wordsListUid === '') {
      const keys = Array.from(wordsLists.keys())
      merge.wordsListUid = keys[0]
    }

    sync({ jwt, vocabAppServiceJsSdk, remote, merge })

    return merge
  }
}
