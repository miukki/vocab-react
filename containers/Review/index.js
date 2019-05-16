// @flow

import { connect } from 'react-redux'
import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {
  Body,
  Button,
  Content,
  Header,
  Text,
  Title,
  StyleProvider,
  View,
  H1
} from 'native-base'
import PropTypes from 'prop-types'

import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'

import { selectLearnedWordObjects } from '../../redux-modules/studyPlan/selector'
import { Navigator } from '../../routers/Root'
import appConfig from '../../config'

const mapStateToProps = (state, ownProps) => ({
  learnedWords: selectLearnedWordObjects(state.get('studyPlan'))
})

const mapDispatchToProps = dispatch => ({
  go: () => {
    dispatch(Navigator.router.getActionForPathAndParams('FlashCards'))
  }
})

const Review = ({ learnedWords, onFlipCardsBtnPress, go, ...rest }) => (
  <StyleProvider style={getTheme(common)}>
    <View style={{ flex: 1 }}>
      <Header>
        <Body>
          <Title>Review</Title>
        </Body>
      </Header>
      <Content padder>
        <H1>Review with flashcards</H1>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <View style={{ paddingBottom: 30, paddingTop: 30 }}>
            <Text>
              {!learnedWords.length
                ? "You haven't learned any words yet, go practice some words!"
                : 'Review  ' + appConfig.amountFlipCards < learnedWords.length
                  ? appConfig.amountFlipCards
                  : "You've learned " + learnedWords.length + " words so far."}
            </Text>
          </View>
          <Button
            block
            disabled={!learnedWords.length}
            style={{ marginTop: 10 }}
            onPress={go}
          >
            <Text>Review 30 Words</Text>
          </Button>
        </View>
      </Content>
    </View>
  </StyleProvider>
)

export default connect(mapStateToProps, mapDispatchToProps)(Review)
