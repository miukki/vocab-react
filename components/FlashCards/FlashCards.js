// @flow

import React from 'react'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Text, View, Button, Icon, H1 } from 'native-base'
import Carousel from 'react-native-snap-carousel'
import styles from './styles'

const horizontalMargin = 20
const slideWidth = Dimensions.get('window').width - 100

const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 2

const carouselStyle = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#fff',
    width: itemWidth,
    marginVertical: 50
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1
  }
})

// prettier-ignore
export type Word = {
  wordStr: String,
  definition: String,
  partsOfSpeech: String,
  phoneticSymbol: String
};

// prettier-ignore
type _CardProps = {
  item: Word,
  flipped: Boolean,
  onFlip: (index: Number) => void,
  onTextToSpeech: (text: String) => void
};

const _Card = ({ item, flipped, onFlip, onTextToSpeech }: _CardProps) => (
  <TouchableOpacity onPress={onFlip} style={{ flex: 1 }}>
    {!flipped ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button light rounded onPress={onTextToSpeech} style={styles.iconButton}>
          <Icon
            name="volume-down"
            style={styles.iconStyle}
          />
        </Button>
        <Text style={styles.vocabWordStyle}>{item.wordStr}</Text>
      </View>
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text uppercase style={styles.descriptionStyle}>
          {item.definition}
        </Text>
        <Text style={styles.partsOfSpeechStyle}>{item.partsOfSpeech}</Text>
        <Text style={styles.phoneticsSymbolStyle}>{item.phoneticSymbol}</Text>
      </View>
    )}
  </TouchableOpacity>
)

// prettier-ignore
type _PanelProps = {onGenerateNew: () => void, onStartAgain: () => void};

const _Panel = ({ onGenerateNew, onStartAgain }: _PanelProps) => (
  <View>
    <H1>Review Completed!</H1>
    <Button block info style={{ marginTop: 20 }} onPress={onStartAgain}>
      <Text>Review Again</Text>
    </Button>
    <Button block style={{ marginTop: 20 }} onPress={onGenerateNew}>
      <Text>New Words</Text>
    </Button>
  </View>
)

// prettier-ignore
type FlashCardsProps = {
  items: Array<Word>,
  flippedItemIndex: Number,
  onSnapToItem: (slideIndex: Number) => void,
  onFlip: (index: Number) => void,
  onTextToSpeech: (text: String) => void,
  onStartAgain: () => void,
  onGenerateNew: () => void,
  _carousel: React.Node
};

export default ({
  items,
  flippedItemIndex,
  onSnapToItem,
  onFlip,
  onTextToSpeech,
  onStartAgain,
  onGenerateNew
}: FlashCardsProps) => (
  <Carousel
    ref={c => {
      this._carousel = c
    }}
    layout={'default'}
    data={[...items, 'end']}
    onSnapToItem={onSnapToItem}
    decelerationRate={'fast'}
    renderItem={({ item, index }) => (
      <View padder style={[carouselStyle.slide, styles.cardStyle]}>
        <View style={carouselStyle.slideInnerContainer}>
          {item !== 'end' ? (
            <_Card
              item={item}
              flipped={flippedItemIndex === index}
              onFlip={() => onFlip(index)}
              onTextToSpeech={onTextToSpeech.bind(null, item.wordStr)}
            />
          ) : (
            <_Panel onStartAgain={onStartAgain} onGenerateNew={onGenerateNew} />
          )}
        </View>
      </View>
    )}
    sliderWidth={sliderWidth}
    itemWidth={itemWidth}
    containerCustomStyle={{ flex: 1 }}
    slideStyle={{ flex: 1 }}
  />
)
