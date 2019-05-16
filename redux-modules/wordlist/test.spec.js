import Expo from 'expo'
import { fromJS, Map, List } from 'immutable'
import * as matchers from 'jest-immutable-matchers'
import reducer from './index'
import * as types from './types'
import { selectItem } from './actions'
import wordsLists from '../../data/words_lists.js'

const initialState = fromJS({
  items: [...wordsLists.keys()].map((list, index) => {
    return {
      title: list,
      onPress: () => {
        window.store.dispatch(selectItem(index))
      },
      progress: 10 * index
    }
  })
})

describe('wordListPicker reducer', () => {
  beforeEach(() => {
    jest.addMatchers(matchers)
  })

  it('should return the initial state', () => {
    expect(JSON.stringify(reducer(undefined, {}))).toMatchSnapshot()
    // use JSON.stringify to avoid test fail with “Compared values have no visual difference.”
    // TODO: find a elegance way to compare
  })

  it('should handle SELECT_ITEM', () => {
    expect(
      reducer(initialState, {
        type: types.SELECT_ITEM,
        index: 1
      })
    ).toMatchSnapshot()
  })
})
