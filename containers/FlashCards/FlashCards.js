// @flow

/* global Expo */
/* global setTimeout  */

import React from 'react'
import { connect } from 'react-redux'
import {
  Body,
  Content,
  Header,
  Title,
  View,
  Button,
  Right,
  Left,
  Icon,
  StyleProvider
} from 'native-base'
import * as Progress from 'react-native-progress'
import FlashCards from '../../components/FlashCards'

import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'

import * as flashCardsActions from '../../redux-modules/flashCards/actions'
import * as flashCardsSelector from '../../redux-modules/flashCards/selector'
import * as studyPlanSelector from '../../redux-modules/studyPlan/selector'

import type { Word } from '../../components/FlashCards'

// prettier-ignore
type Words = Array<Word>;

const mapStateToProps = (state, ownProps) => ({
  items: flashCardsSelector.selectItems(state.get('flashCards')),
  index: flashCardsSelector.selectIndex(state.get('flashCards')),
  flippedItemIndex: flashCardsSelector.selectFlippedItemIndex(
    state.get('flashCards')
  ),
  learnedWords: studyPlanSelector.selectLearnedWordObjects(
    state.get('studyPlan')
  )
})

const mapDispatchToProps = dispatch => ({
  generateNew: (learnedWords: Array<String>) => {
    dispatch(flashCardsActions.generateNew(learnedWords))
  },
  updateIndex: (index: Number) => {
    dispatch(flashCardsActions.updateIndex(index))
  },
  flip: (index?: Number) => {
    dispatch(flashCardsActions.flip(index))
  }
})

const _Header = ({ title, onBack }: { title: String, onBack: () => void }) => (
  <Header>
    <Left>
      <Button transparent onPress={onBack}>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right>
      <Button transparent />
    </Right>
  </Header>
)

// prettier-ignore
type FlashCardsContainerProps = {
  items: Words,
  index: Number,
  flippedItemIndex: Number,
  navigation: Object,
  generateNew: (learnedWords: Array<String>) => void,
  updateIndex: (index: Number) => void
};

// prettier-ignore
type FlashCardsContainerState = {
  showSwiper: Boolean
};

class FlashCardsContainer extends React.Component<
  FlashCardsContainerProps,
  FlashCardsContainerState
> {
  state = {
    showSwiper: false
  }

  _back(): void {
    this.props.navigation.goBack()
  }

  _textToSpeech(text): void {
    Expo.Speech.speak(text, { language: 'en' })
  }

  _reloadSwiper(): void {
    this.setState({ showSwiper: false })
    setTimeout(() => {
      this.props.updateIndex(0)
      this.setState({ showSwiper: true })
    }, 100)
  }

  _generateNew(): void {
    this.props.generateNew(this.props.learnedWords)
    this._reloadSwiper()
  }

  _swipe(slideIndex: Number): void {
    this.props.flip(null)
    this.props.updateIndex(slideIndex)
  }

  _flip(index: Number): void {
    if (this.props.flippedItemIndex === index) {
      return this.props.flip(null)
    }
    this.props.flip(index)
  }

  constructor(props) {
    super(props)
    this._back = this._back.bind(this)
    this._textToSpeech = this._textToSpeech.bind(this)
    this._reloadSwiper = this._reloadSwiper.bind(this)
    this._generateNew = this._generateNew.bind(this)
    this._swipe = this._swipe.bind(this)
    this._flip = this._flip.bind(this)
  }

  componentDidMount() {
    this._generateNew()
  }

  render() {
    let { items, index, flippedItemIndex } = this.props
    const title = `${index}/${items.length}`
    const progress = index / items.length

    return (
      <StyleProvider style={getTheme(common)}>
        <View style={{ flex: 1 }}>
          <_Header title={title} onBack={this._back} />
          {items.length ? (
            <Progress.Bar progress={progress} width={null} borderRadius={0} />
          ) : null}
          {this.state.showSwiper ? (
            <FlashCards
              items={items}
              flippedItemIndex={flippedItemIndex}
              onSnapToItem={this._swipe}
              onFlip={this._flip}
              onTextToSpeech={this._textToSpeech}
              onStartAgain={this._reloadSwiper}
              onGenerateNew={this._generateNew}
            />
          ) : null}
        </View>
      </StyleProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCardsContainer)
