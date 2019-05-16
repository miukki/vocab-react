import { fromJS } from 'immutable'
import * as selector from './selector'

describe('settings selector', function() {
  it('selectLocation', function() {
    expect(selector.selectLocation(fromJS({ location: 'fake_location' }))).toBe(
      'fake_location'
    )
  })
})
