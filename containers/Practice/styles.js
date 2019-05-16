import { StyleSheet, Platform } from 'react-native'

const platform = Platform.OS;

export default StyleSheet.create({
  wordContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center'
  },
  word: {
    fontSize: 32,
    color: 'rgba(67, 60, 58, 1)',
    fontWeight: 'bold'
  },
  partsOfSpeech: {
    fontSize: 20,
    marginTop: 2,
    color: 'rgba(67, 60, 58, 0.6)'
  },
  phoneticsSymbol: {
    fontSize: 20,
    marginTop: 10,
  },
  speechIcon: {
    fontSize: platform === "ios" ? 30 : 25,
    color: 'rgba(67, 60, 58, 1)',
    paddingTop: platform === "ios" ? 4: 8,
    paddingLeft: 6,
    paddingRight: 6
  },
  answerStyle: {
    padding: 18,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(199, 223, 255, 1)',
    overflow: 'hidden'
  },
  rightAnswerStyle: {
    backgroundColor: 'rgba(17, 221, 160, 1)'
  },
  wrongAnswerStyle: {
    backgroundColor: 'rgba(225, 87, 79, 1)'
  },
  fbuttonStyle: {
    justifyContent: 'center',
    height: 35,
    borderWidth: 0,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  completedContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  completedMessageContainer: {
    padding: 20
  },
  completedMessageContent: {
    flexDirection: 'row'
  },
  completedText: {
    lineHeight: 28
  },
  completedIcon: {
    paddingRight: 10,
    color: 'rgba(251, 208, 67, 1)'
  }
});
