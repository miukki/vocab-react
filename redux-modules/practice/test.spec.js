import Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'
import reducer from './index'
import * as types from './types'

const initialState = Immutable.fromJS({
  selected: null,
  answers: [],
  wordStr: 'wordStr_0',
  partsOfSpeech: 'partsOfSpeech_0',
  phoneticSymbol: 'phoneticSymbol_0'
})

describe('answerSelectionPicker reducer', () => {
  beforeAll(() => {
    jest.addMatchers(matchers)
  })

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqualImmutable(initialState)
  })

  it('should handle SELECT_ANSWER', () => {
    expect(
      reducer(initialState, {
        type: types.SELECT_ANSWER,
        index: 1
      })
    ).toEqualImmutable(
      Immutable.fromJS({
        selected: null,
        answers: [],
        wordStr: 'wordStr_0',
        partsOfSpeech: 'partsOfSpeech_0',
        phoneticSymbol: 'phoneticSymbol_0'
      })
    )
  })
})
