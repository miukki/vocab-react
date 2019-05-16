import reducer from './'
import types from './types'

describe('signIn redux', function() {
  it('should return the initial state', function() {
    expect(reducer(undefined, {})).toMatchSnapshot()
  })

  it('should show', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.SHOW
      }).toJS()
    ).toMatchObject({ show: true })
  })

  it('should hide', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.HIDE
      }).toJS()
    ).toMatchObject({ show: false })
  })

  it('should change name', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.CHANGE_NAME,
        payload: { name: 'fake-name' }
      }).toJS()
    ).toMatchObject({ name: 'fake-name' })
  })

  it('should set submitting', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.SUBMIT
      }).toJS()
    ).toMatchObject({ submitting: true })

    expect(
      reducer(reducer(undefined, {}), {
        type: types.SUBMIT_DONE
      }).toJS()
    ).toMatchObject({ submitting: false })
  })

  it('should set error', () => {
    const errorTypes = [{ errorType: 'wrongName' }]
    expect(
      reducer(reducer(undefined, {}).set('submitting', true), {
        type: types.SHOW_ERROR,
        payload: { errorTypes }
      }).toJS()
    ).toMatchObject({ submitting: false, error: { wrongName: true } })
  })

  it('dismiss error', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.DISMISS_ERROR
      }).toJS()
    ).toMatchObject({
      error: {
        wrongName: false
      }
    })
  })
})
