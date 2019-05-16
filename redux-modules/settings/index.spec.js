import reducer from './'
import * as types from './types'

describe('signIn redux', function() {
  it('should return the initial state', function() {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should update location', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.UPDATE_LOCATION,
        payload: { location: 'fake_location' }
      }).toJS()
    ).toMatchSnapshot()
  })
})
