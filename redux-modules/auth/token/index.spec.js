import reducer from './'
import types from './types'

describe('token redux', function() {
  it('should return the initial state', function() {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should set JWT', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.SET_JWT,
        payload: { jwt: 'jwt-token' }
      }).toJS()
    ).toMatchObject({ jwt: 'jwt-token' })
  })

  it('should delete JWT', function() {
    reducer(reducer(undefined, {}), {
      type: types.SET_JWT,
      payload: { jwt: 'jwt-token' }
    })
    expect(
      reducer(reducer(undefined, {}), {
        type: types.DELETE_JWT
      }).toJS()
    ).toMatchObject({ jwt: null })
  })
})
