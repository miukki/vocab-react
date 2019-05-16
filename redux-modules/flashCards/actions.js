// @flow
import models from 'eic-vocab-app-models'

import * as types from './types'
import appConfig from '../../config'

export const generateNew = learnedWordsByUser => {
  const items = models.Review.getCards(
    learnedWordsByUser,
    appConfig.amountFlipCards
  )
  return {
    type: types.GENERATE_NEW,
    payload: { items }
  }
}

export const updateIndex = index => {
  return {
    type: types.UPDATE_INDEX,
    payload: { index }
  }
}

export const flip = index => {
  return {
    type: types.FLIP,
    payload: { index }
  }
}
