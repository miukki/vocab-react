/* global setTimeout */

import { NavigationActions } from 'react-navigation'

import { changeWordsList } from '../studyPlan/actions'
import wordsLists from '../../data/words_lists'

export const selectSelectable = state => {
  return (
    state.homeNav.routes[1] &&
    state.homeNav.routes[1].routeName === 'SelectWordsList'
  )
}

export const selectItems = state => {
  const wordsListUid = state.studyPlan.wordsListUid
  const learnedWords = state.studyPlan.learnedWords

  return [...wordsLists.entries()].map((list, index) => {
    const wordsList = [...list[1]]
    const progress =
      wordsList.filter(w => [...learnedWords].indexOf(w.wordStr) !== -1)
        .length /
      wordsList.length *
      100

    return {
      title: list[0],
      selected: list[0] === wordsListUid,
      onPress: function() {
        if (window.store.getState().toJS().homeNav.routes[1]) {
          window.store.dispatch(changeWordsList(index))
          window.store.dispatch(
            NavigationActions.back({
              key: window.store.getState().toJS().homeNav.routes[1].key
            })
          )
        }
      },
      progress
    }
  })
}
