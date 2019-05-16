import { fromJS } from 'immutable'
import * as selector from './selector'

describe('signIn selector', function() {
  it('selectShow', function() {
    expect(selector.selectShow(fromJS({ show: true }))).toBeTruthy()
  })

  it('selectSubmitting', function() {
    expect(selector.selectSubmitting(fromJS({ submitting: true }))).toBeTruthy()
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

  it('selectPassword', function() {
    expect(selector.selectPassword(fromJS({ password: 'fake-password' }))).toBe(
      'fake-password'
    )
  })

  it('selectErrorTypes', function() {
    expect(
      selector.selectErrorTypes(
        fromJS({ error: { wrongMobile: true, userPasswordMismatch: false } })
      )
    ).toHaveLength(1)

    expect(
      selector.selectErrorTypes(
        fromJS({ error: { wrongMobile: false, userPasswordMismatch: true } })
      )
    ).toHaveLength(1)

    expect(
      selector.selectErrorTypes(
        fromJS({ error: { wrongMobile: false, userPasswordMismatch: false } })
      )
    ).toHaveLength(0)
  })
})
