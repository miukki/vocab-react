import { fromJS } from 'immutable'
import * as selector from './selector'

describe('signIn selector', function() {
  it('selectShow', function() {
    expect(selector.selectShow(fromJS({ show: true }))).toBeTruthy()
  })

  it('selectSubmitting', function() {
    expect(selector.selectSubmitting(fromJS({ submitting: true }))).toBeTruthy()
  })

  it('selectHasError', function() {
    expect(
      selector.selectHasError(fromJS({ error: { wrongName: true } }))
    ).toBeTruthy()
  })

  it('selectName', function() {
    expect(selector.selectName(fromJS({ name: 'fake-name' }))).toBe('fake-name')
  })

  it('selectErrorTypes', function() {
    expect(
      selector.selectErrorTypes(fromJS({ error: { wrongName: true } }))
    ).toHaveLength(1)

    expect(
      selector.selectErrorTypes(fromJS({ error: { wrongName: false } }))
    ).toHaveLength(0)
  })
})
