import { fromJS } from 'immutable'

import reducer, { initialState } from './'
import types from './types'

describe('studyPlan redux', function() {
  it('should return the initial state', function() {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should update currentDate', function() {
    Date.prototype.toISOString = jest.fn()
    Date.prototype.toISOString.mockReturnValue('2018-05-01')

    expect(
      reducer(fromJS(initialState), {
        type: types.UPDATE_CURRENT_DATE
      }).toJS()
    ).toMatchSnapshot()
  })
})
