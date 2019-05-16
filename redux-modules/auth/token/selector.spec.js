import { fromJS } from 'immutable'
import * as selector from './selector'

// 'user.created_at is 2018-04-26 03:59:35 +0800'
const JWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImNyZWF0ZWRfYXQiOiIyMDE4LTA0LTI2IDAzOjU5OjM1ICswODAwIn19.CElzUdC_LICPbX85DHjkgwNHV2-Us1Kk44u224MXxmQWcHD85S-S3_UcNkrgjqUPisBVmk7aMsfFa3dxC3nP2A'

describe('token selector', function() {
  it('selectBgImgIndexBySignUpDate', function() {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date('2018-05-30 03:59:35 +0800'))
    // time zone will be ignored
    expect(selector.selectBgImgIndexBySignUpDate(fromJS({ jwt: JWT }))).toBe(16)

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date('2018-04-27 03:59:35 +0800'))
    expect(selector.selectBgImgIndexBySignUpDate(fromJS({ jwt: JWT }))).toBe(0)
  })
})
