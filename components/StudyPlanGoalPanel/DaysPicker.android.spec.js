/* eslint-env jest */

import 'react-native'
import React from 'react'
import DaysPicker from './DaysPicker.android'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import jsdom from 'jsdom'

jest.mock('native-base', () => {
  return { Button: 'Button' }
})

describe('description', function() {
  const dailyWordsAmounts = [5, 10, 15, 20, 25, 30, 40]

  it('render', function() {
    const tree = renderer
      .create(
        <DaysPicker
          dailyWordsAmounts={dailyWordsAmounts}
          dailyWordsAmount={20}
          changeDailyWordsAmountWithoutConfirm={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('description', function() {
    const { JSDOM } = jsdom

    const wrapper = mount(
      <DaysPicker
        dailyWordsAmounts={dailyWordsAmounts}
        dailyWordsAmount={20}
        changeDailyWordsAmountWithoutConfirm={() => {}}
      />
    )
    expect(wrapper.state().dailyWordsAmount).toBe(20)
    wrapper.setProps({ dailyWordsAmount: 40 })
    expect(wrapper.state().dailyWordsAmount).toBe(40)
  })
})
