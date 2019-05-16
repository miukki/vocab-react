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

  it('should change mobile', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.CHANGE_MOBILE,
        payload: { mobile: '18000000000' }
      }).toJS()
    ).toMatchObject({ mobile: '18000000000' })
  })

  it('should set vcodeSending', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.SEND_VCODE
      }).toJS()
    ).toMatchObject({ vcodeSending: true })
  })

  it('should set state for SEND_VCODE_DONE', function() {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.SEND_VCODE_DONE
      }).toJS()
    ).toMatchObject({
      vcodeSending: false,
      vcodeSent: true,
      vcodeCountdown: 120
    })
  })

  it('should set vcodeCountdown', function() {
    expect(
      reducer(
        reducer(reducer(undefined, {}), {
          type: types.SEND_VCODE_DONE
        }),
        {
          type: types.COUNTDOWN_VCODE
        }
      ).toJS().vcodeCountdown
    ).toMatchSnapshot()
  })

  it('should change vcode', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.CHANGE_VCODE,
        payload: { vcode: '666666' }
      }).toJS()
    ).toMatchObject({ vcode: '666666' })
  })

  it('should change password', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.CHANGE_PASSWORD,
        payload: { password: 'fake-password' }
      }).toJS()
    ).toMatchObject({ password: 'fake-password' })
  })

  it('should set showPassword', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.SHOW_PASSWORD
      }).toJS()
    ).toMatchObject({ showPassword: true })

    expect(
      reducer(reducer(undefined, {}), {
        type: types.HIDE_PASSWORD
      }).toJS()
    ).toMatchObject({ showPassword: false })
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
    const errorTypes = [{ errorType: 'wrongMobile' }]
    expect(
      reducer(
        reducer(undefined, {})
          .set('vcodeSending', true)
          .set('vcodeCountdown', 120)
          .set('submitting', true),
        {
          type: types.SHOW_ERROR,
          payload: { errorTypes }
        }
      ).toJS()
    ).toMatchSnapshot()
  })

  it('dismiss error', () => {
    expect(
      reducer(reducer(undefined, {}), {
        type: types.DISMISS_ERROR
      }).toJS()
    ).toMatchObject({
      error: {
        duplicateMobile: false,
        wrongVcode: false,
        weakPassword: false,
        wrongMobile: false
      }
    })
  })
})
