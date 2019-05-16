import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  AnswerSelectionPicker,
  ActionFooter
} from 'prepsmith-react-native-components'
import * as Progress from 'react-native-progress'
import {
  View,
  Header,
  Title,
  Body,
  Button,
  Content,
  Footer,
  Icon,
  Left,
  Right,
  Text,
  H1,
  StyleProvider
} from 'native-base'

import * as selectors from '../../redux-modules/practice/selector'
import * as studyPlanSelectors from '../../redux-modules/studyPlan/selector'
import * as actions from '../../redux-modules/practice/actions'

import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import styles from './styles'

class Practice extends Component {
  render() {
    let {
      navigation,
      selected,
      planAmount,
      remain,
      complete,
      checkinLogs,
      wordStr,
      partsOfSpeech,
      phoneticSymbol,
      answers,
      onAnswerSelect,
      onGetNextQuestion,
      onTellDontKnow,
      onSkip,
      onTextToSpeech,
      showingResult
    } = this.props

    return (
      <StyleProvider style={getTheme(common)}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Header>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{`${planAmount - remain} / ${planAmount}`}</Title>
            </Body>
            <Right>
              <Button transparent />
            </Right>
          </Header>
          <Progress.Bar
            progress={(planAmount - remain) / planAmount}
            width={null}
            borderRadius={0}
          />
          {!complete ? (
            <Content padder>
              <View style={styles.wordContainer}>
                <TouchableOpacity
                  onPress={() => onTextToSpeech()}
                  style={{ flexDirection: 'row' }}
                >
                  <Text style={styles.word}>{wordStr}</Text>
                  <Icon name="volume-down" style={styles.speechIcon} />
                </TouchableOpacity>
                <Text style={styles.partsOfSpeech}>{partsOfSpeech}</Text>
                <Text style={styles.phoneticsSymbol}>{phoneticSymbol}</Text>
              </View>
              <AnswerSelectionPicker
                selected={selected}
                answers={answers}
                onSelect={onAnswerSelect}
                isDisabled={selected !== null}
                answerStyle={styles.answerStyle}
                rightAnswerStyle={styles.rightAnswerStyle}
                wrongAnswerStyle={styles.wrongAnswerStyle}
              />
            </Content>
          ) : (
            <Content padder contentContainerStyle={styles.completedContainer}>
              <H1>Daily Goal Completed!</H1>
              <View style={styles.completedMessageContainer}>
                <View style={styles.completedMessageContent}>
                  <Icon name="ios-thumbs-up" style={styles.completedIcon} />
                  <Text style={styles.completedText}>
                    Learned {planAmount / 3} words
                  </Text>
                </View>
                <View style={styles.completedMessageContent}>
                  <Icon name="ios-thumbs-up" style={styles.completedIcon} />
                  <Text style={styles.completedText}>
                    Checked-in {checkinLogs.length} days
                  </Text>
                </View>
              </View>
              <Button block onPress={() => navigation.goBack()}>
                <Text>OK</Text>
              </Button>
            </Content>
          )}

          {!complete ? (
            <Footer>
              {!showingResult ? (
                <ActionFooter
                  fbuttonStyle={styles.fbuttonStyle}
                  fbuttons={[
                    {
                      text: "I don't know",
                      bgColor: '#A7A7A7'
                    },
                    {
                      text: 'Too easy',
                      bgColor: '#A7A7A7'
                    }
                  ]}
                  onSelect={({ index, isDisabled }) => {
                    if (index === 0) {
                      onTellDontKnow()
                      return
                    }
                    if (index === 1) {
                      onSkip()
                    }
                  }}
                />
              ) : (
                <ActionFooter
                  fbuttonStyle={styles.fbuttonStyle}
                  fbuttons={[
                    {
                      text: 'Next',
                      isDisabled: false,
                      flex: 2
                    }
                  ]}
                  onSelect={({ index, isDisabled }) => {
                    if (index === 0) {
                      onGetNextQuestion()
                    }
                  }}
                />
              )}
            </Footer>
          ) : null}
        </View>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selected: selectors.selectSelected(state.get('practice')),
  wordStr: selectors.selectWordStr(state.get('practice')),
  partsOfSpeech: selectors.selectPartsOfSpeech(state.get('practice')),
  phoneticSymbol: selectors.selectPhoneticSymbol(state.get('practice')),
  answers: selectors.selectAnswers(state.get('practice')),
  planAmount: selectors.selectPlanAmount(state.get('practice')),
  remain: selectors.selectRemain(state.get('practice')),
  showingResult: selectors.selectShowingResult(state.get('practice')),
  complete: selectors.selectComplete(state.get('practice')),
  checkinLogs: studyPlanSelectors.selectCheckinLogs(state.get('studyPlan'))
})

const mapDispatchToProps = dispatch => ({
  onAnswerSelect: ({ index, isCorrect }) =>
    dispatch(actions.selectAnswer(index)),
  onGetNextQuestion: () => dispatch(actions.getNextQuestion()),
  onTellDontKnow: () => dispatch(actions.tellDontKnow()),
  onSkip: () => dispatch(actions.skip()),
  onTextToSpeech: () => dispatch(actions.textToSpeech())
})

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
