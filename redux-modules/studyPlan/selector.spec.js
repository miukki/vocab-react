import { fromJS } from 'immutable'
import * as selector from './selector'

describe('studyPlan selector', function() {
  describe('selectDailyWordsAmount', function() {
    it('select dailyWordsAmount', function() {
      expect(
        selector.selectDailyWordsAmount(
          fromJS({
            wordsListUid: 'IELTS Listening',
            dailyWordsAmountOfWordsList: { 'IELTS Listening': 20 }
          })
        )
      ).toBe(20)
    })

    it('return default value when dailyWordsAmount not found in state', function() {
      expect(
        selector.selectDailyWordsAmount(
          fromJS({
            wordsListUid: 'IELTS Speaking',
            dailyWordsAmountOfWordsList: { 'IELTS Listening': 20 }
          })
        )
      ).toBe(15)
    })
  })

  describe('selectWordsListUid', function() {
    it('select wordsListUid', function() {
      expect(
        selector.selectWordsListUid(fromJS({ wordsListUid: 'IELTS Listening' }))
      ).toBe('IELTS Listening')
    })

    it('return default one when given wordsListUid do not exist', function() {
      expect(
        selector.selectWordsListUid(fromJS({ wordsListUid: 'not exists' }))
      ).toBe('IELTS Listening')
    })
  })

  describe('selectLearnedWordsOfCompletePractice', function() {
    it('select selectLearnedWordsOfCompletePractice', function() {
      Date.prototype.toISOString = jest
        .fn(Date.prototype.toISOString)
        .mockImplementation(() => '2018-05-30 03:59:35 +0800')

      expect(
        selector.selectLearnedWordsOfCompletePractice(
          fromJS({
            wordsListUid: 'IELTS Listening',
            checkinLogs: ['20180530$IELTS Listening$15']
          })
        )
      ).toBe(15)
    })
  })

  describe('selecteDailyGoalComplete', function() {
    it('select selecteDailyGoalComplete', function() {
      Date.prototype.toISOString = jest
        .fn(Date.prototype.toISOString)
        .mockImplementation(() => '2018-05-30 03:59:35 +0800')

      expect(
        selector.selecteDailyGoalComplete(
          fromJS({
            wordsListUid: 'IELTS Listening',
            checkinLogs: ['20180530$IELTS Listening$15']
          })
        )
      ).toBeTruthy()

      expect(
        selector.selecteDailyGoalComplete(
          fromJS({
            wordsListUid: 'IELTS Listening',
            checkinLogs: ['20180501$IELTS Listening$15']
          })
        )
      ).toBeFalsy()

      expect(
        selector.selecteDailyGoalComplete(
          fromJS({
            wordsListUid: 'IELTS Listening',
            checkinLogs: ['20180530$IELTS Reading$15']
          })
        )
      ).toBeFalsy()
    })
  })

  describe('selectCheckinLogs', function() {
    it('select selectCheckinLogs', function() {
      expect(
        selector.selectCheckinLogs(
          fromJS({
            wordsListUid: 'IELTS Listening',
            checkinLogs: [
              '20180530$IELTS Listening$15',
              '20180530$IELTS Reading$15'
            ]
          })
        )
      ).toMatchSnapshot()

      expect(
        selector.selectCheckinLogs(
          fromJS({
            wordsListUid: 'IELTS Listening',
            checkinLogs: [
              '20180501$IELTS Listening$15',
              '20180501$IELTS Reading$15',
              '20180530$IELTS Listening$15',
              '20180530$IELTS Reading$15'
            ]
          })
        )
      ).toMatchSnapshot()
    })
  })
})
