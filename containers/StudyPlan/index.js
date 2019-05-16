import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { View, Content, Button, Text, H1, H3, StyleProvider } from 'native-base'
import { Platform, ScrollView, Image } from 'react-native'
import PropTypes from 'prop-types'
import Sentry from 'sentry-expo'

import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import StudyPlanGoalPanel from '../../components/StudyPlanGoalPanel'
import styles from './styles'

import * as tokenSelector from '../../redux-modules/auth/token/selector'
import * as selector from '../../redux-modules/studyPlan/selector'
import * as practiceSelector from '../../redux-modules/practice/selector'
import * as actions from '../../redux-modules/studyPlan/actions'
import types from '../../redux-modules/studyPlan/types'

class StudyPlan extends Component {
  _showDaysPicker() {
    console.log('click')
    this.setState({ showDaysPicker: true })
  }

  _hideDaysPicker() {
    this.setState({ showDaysPicker: false })
  }

  constructor(props) {
    super(props)
    this.state =
      Platform.OS === 'ios'
        ? {
            showDaysPicker: false
          }
        : {}

    this._showDaysPicker = this._showDaysPicker.bind(this)
    this._hideDaysPicker = this._hideDaysPicker.bind(this)
  }

  componentDidMount() {
    this.props.init()
    this.props.checkDate()
  }

  goPractice(props) {
    let { startPractice, navigation } = props
    let {
      dailyGoalComplete,
      practiceRemain,
      wordsList,
      learnedWordsInWordsList,
      dailyWordsAmount
    } = props

    if (!dailyGoalComplete && practiceRemain) {
      navigation.navigate('Practice')
      return
    }

    startPractice({
      wordsList,
      learnedWordsInWordsList,
      amount: dailyWordsAmount
    })
    navigation.navigate('Practice')
  }

  render() {
    let {
      wordsListUid,
      learnedWordsOfCompletePractice,
      practiceRemain,
      practicePlanAmount,
      dailyWordsAmount,
      wordsListComplete,
      dailyGoalComplete,
      navigation,
      bgImgIndexBySignUpDate
    } = this.props

    const bgImgs = [
      require('../../img/patterns/1.png'),
      require('../../img/patterns/2.png'),
      require('../../img/patterns/3.png'),
      require('../../img/patterns/4.png'),
      require('../../img/patterns/5.png'),
      require('../../img/patterns/6.png'),
      require('../../img/patterns/7.png'),
      require('../../img/patterns/8.png'),
      require('../../img/patterns/9.png'),
      require('../../img/patterns/10.png'),
      require('../../img/patterns/11.png'),
      require('../../img/patterns/12.png'),
      require('../../img/patterns/13.png'),
      require('../../img/patterns/14.png'),
      require('../../img/patterns/15.png'),
      require('../../img/patterns/16.png'),
      require('../../img/patterns/17.png'),
      require('../../img/patterns/18.png'),
      require('../../img/patterns/19.png'),
      require('../../img/patterns/20.png'),
      require('../../img/patterns/21.png'),
      require('../../img/patterns/22.png'),
      require('../../img/patterns/23.png'),
      require('../../img/patterns/24.png'),
      require('../../img/patterns/25.png'),
      require('../../img/patterns/26.png'),
      require('../../img/patterns/27.png'),
      require('../../img/patterns/28.png'),
      require('../../img/patterns/29.png'),
      require('../../img/patterns/30.png'),
      require('../../img/patterns/31.png'),
      require('../../img/patterns/32.png'),
      require('../../img/patterns/33.png'),
      require('../../img/patterns/34.png'),
      require('../../img/patterns/35.png'),
      require('../../img/patterns/36.png'),
      require('../../img/patterns/37.png'),
      require('../../img/patterns/38.png'),
      require('../../img/patterns/39.png'),
      require('../../img/patterns/40.png'),
      require('../../img/patterns/41.png'),
      require('../../img/patterns/42.png'),
      require('../../img/patterns/43.png'),
      require('../../img/patterns/44.png'),
      require('../../img/patterns/45.png'),
      require('../../img/patterns/46.png'),
      require('../../img/patterns/47.png'),
      require('../../img/patterns/48.png'),
      require('../../img/patterns/49.png'),
      require('../../img/patterns/50.png')
    ]

    return (
      <StyleProvider style={getTheme(common)}>
        <View style={{ height: '100%' }}>
          <Image
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: -1,
              opacity: 0.4
            }}
            source={bgImgs[bgImgIndexBySignUpDate]}
            resizeMode="cover"
          />
          <ScrollView>
            <Content
              padder
              style={{ marginTop: Platform.OS === 'ios' ? 40 : 0 }}
            >
              <H1>Daily Practice</H1>
              <StudyPlanGoalPanel
                onShowDaysPicker={this._showDaysPicker}
                onHideDaysPicker={this._hideDaysPicker}
                showDaysPicker={this.state.showDaysPicker}
                {...this.props}
              />
              {wordsListComplete ? (
                <View>
                  <H3>Vocab List Completed!</H3>
                  <Button
                    block
                    style={{ marginTop: 10 }}
                    onPress={() => navigation.navigate('SelectWordsList')}
                  >
                    <Text>Select a new list</Text>
                  </Button>
                </View>
              ) : dailyGoalComplete ? (
                <View>
                  <H3 style={{ textAlign: 'center' }}>Daily Goal Completed!</H3>
                  <Text style={styles.progressCaption}>
                    {wordsListUid}, {learnedWordsOfCompletePractice} words / day
                  </Text>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Button
                      block
                      info
                      style={{ flex: 1, marginRight: 10 }}
                      onPress={() => navigation.navigate('SelectWordsList')}
                    >
                      <Text>Try New List</Text>
                    </Button>
                    <Button
                      block
                      info
                      style={{ flex: 1 }}
                      onPress={() => navigation.navigate('Review')}
                    >
                      <Text>Review Words</Text>
                    </Button>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.progressCaption}>
                    {practiceRemain
                      ? `Daily Goal: ${Number.parseInt(
                          (practicePlanAmount - practiceRemain) /
                            practicePlanAmount *
                            100
                        )}% completed`
                      : null}
                  </Text>
                  <Button block onPress={() => this.goPractice(this.props)}>
                    {practiceRemain ? (
                      <Text>Resume Practice</Text>
                    ) : (
                      <Text>Start Practice</Text>
                    )}
                  </Button>
                </View>
              )}
            </Content>
          </ScrollView>
        </View>
      </StyleProvider>
    )
  }
}

StudyPlan.propTypes = {
  navigation: PropTypes.object,

  // statistic
  wordsListUid: PropTypes.string,
  wordsList: PropTypes.array,
  learnedWordsInWordsList: PropTypes.array,
  checkinLogs: PropTypes.array,
  dailyWordsAmount: PropTypes.number,
  wordsListWordsAmount: PropTypes.number,
  daysLeft: PropTypes.number,

  // picker
  showDaysPicker: PropTypes.bool,
  dailyWordsAmounts: PropTypes.array,
  daysAmounts: PropTypes.array,
  pickerDailyWordsAmount: PropTypes.number,
  pickerDaysAmount: PropTypes.number,

  // Study Plan status
  dailyGoalComplete: PropTypes.bool,
  wordsListComplete: PropTypes.bool,
  practiceRemain: PropTypes.number,

  // functions
  onShowDaysPicker: PropTypes.func,
  onConfirmDaysPicker: PropTypes.func,
  onHideDaysPicker: PropTypes.func,
  changeDailyWordsAmount: PropTypes.func,
  changeDaysAmount: PropTypes.func,
  startPractice: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
  bgImgIndexBySignUpDate: tokenSelector.selectBgImgIndexBySignUpDate(
    state.get('token')
  ),

  wordsList: selector.selectWordsList(state.get('studyPlan')),
  dailyWordsAmount: selector.selectDailyWordsAmount(state.get('studyPlan')),
  learnedWordsInWordsList: selector.selectLearnedWordsInWordsList(
    state.get('studyPlan')
  ),
  checkinLogs: selector.selectCheckinLogs(state.get('studyPlan')),
  wordsListUid: selector.selectWordsListUid(state.get('studyPlan')),
  wordsListWordsAmount: selector.selectWordsListAmount(state.get('studyPlan')),
  daysLeft: selector.selectDaysLeft(state.get('studyPlan')),

  // picker
  dailyWordsAmounts: selector.selectDailyWordsAmounts(state.get('studyPlan')),
  daysAmounts: selector.selectDaysAmounts(state.get('studyPlan')),
  pickerDailyWordsAmount: selector.selectPickerDailyWordsAmount(
    state.get('studyPlan')
  ),
  pickerDaysAmount: selector.selectPickerDaysAmount(state.get('studyPlan')),

  // Study Plan status
  dailyGoalComplete: selector.selecteDailyGoalComplete(state.get('studyPlan')),
  wordsListComplete: selector.selectWordsListComplete(state.get('studyPlan')),
  learnedWordsOfCompletePractice: selector.selectLearnedWordsOfCompletePractice(
    state.get('studyPlan')
  ),
  practiceRemain: practiceSelector.selectRemain(state.get('practice')),
  practicePlanAmount: practiceSelector.selectPlanAmount(state.get('practice'))
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(actions.init()),
  onConfirmDaysPicker: () => dispatch(actions.confirmDaysPicker()),
  changeDailyWordsAmountWithoutConfirm: index =>
    dispatch(actions.changeDailyWordsAmountWithoutConfirm(index)),
  changeDailyWordsAmount: index =>
    dispatch(actions.changeDailyWordsAmount(index)),
  changeDaysAmount: index => dispatch(actions.changeDaysAmount(index)),
  startPractice: ({ wordsList, learnedWordsInWordsList, amount }) =>
    dispatch(
      actions.startPractice({
        wordsList,
        learnedWords: learnedWordsInWordsList,
        amount
      })
    ),
  checkDate: () => dispatch(actions.checkDate())
})

export default connect(mapStateToProps, mapDispatchToProps)(StudyPlan)
