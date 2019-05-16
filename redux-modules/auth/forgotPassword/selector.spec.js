import { fromJS } from 'immutable'
import * as selector from './selector'

describe('signIn selector', function() {
  it('selectShow', function() {
    expect(selector.selectShow(fromJS({ show: true }))).toBeTruthy()
  })

  it('selectSubmitting', function() {
    expect(selector.selectSubmitting(fromJS({ submitting: true }))).toBeTruthy()
  })

  it('selectVcodeSending', function() {
    expect(
      selector.selectVcodeSending(fromJS({ vcodeSending: true }))
    ).toBeTruthy()
  })

  it('selectVcodeSentAt', function() {
    expect(
      selector.selectVcodeSentAt(fromJS({ vcodeSentAt: Date.now() }))
    ).toBeTruthy()
  })

  it('selectVcodeDisabled', function() {
    expect(
      selector.selectVcodeDisabled(fromJS({ vcodeCountdown: 30 }))
    ).toBeTruthy()

    expect(
      selector.selectVcodeDisabled(fromJS({ vcodeSending: true }))
    ).toBeTruthy()
  })

  it('selectShowPassword', function() {
    expect(
      selector.selectShowPassword(fromJS({ showPassword: true }))
    ).toBeTruthy()
  })

  it('selectHasError', function() {
    expect(
      selector.selectHasError(fromJS({ error: { wrongMobile: true } }))
    ).toBeTruthy()
  })

  it('selectMobile', function() {
    expect(selector.selectMobile(fromJS({ mobile: '18000000000' }))).toBe(
      '18000000000'
    )
  })

  it('selectVcode', function() {
    expect(selector.selectVcode(fromJS({ vcode: '666666' }))).toBe('666666')
  })

  it('selectVcodeCountdown', function() {
    expect(
      selector.selectVcodeCountdown(fromJS({ vcodeCountdown: '30' }))
    ).toBe('30')
  })

  it('selectPassword', function() {
    expect(selector.selectPassword(fromJS({ password: 'fake-password' }))).toBe(
      'fake-password'
    )
  })

  it('selectErrorTypes', function() {
    expect(
      selector.selectErrorTypes(
        fromJS({ error: { wrongMobile: true, wrongVcode: false } })
      )
    ).toHaveLength(1)

    expect(
      selector.selectErrorTypes(
        fromJS({ error: { wrongMobile: false, wrongVcode: true } })
      )
    ).toHaveLength(1)

    expect(
      selector.selectErrorTypes(
        fromJS({ error: { wrongMobile: false, wrongVcode: false } })
      )
    ).toHaveLength(0)
  })
})
