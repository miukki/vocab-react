import { StyleSheet, Platform } from 'react-native'

const platform = Platform.OS

export default StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    justifyContent: 'center',
    borderWidth: platform === 'ios' ? 0 : 1,
    borderColor: '#d6d7da'
  },
  iconContainerStyle: {
    width: 80,
    height: 80
  },
  textContainerStyle: {
    alignItems: 'center'
  },
  listItemStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: 450
  },
  iconButton: {
    alignSelf: 'center',
    elevation: 0,
    marginBottom: 20
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: platform === 'ios' ? 35 : 25,
    color: 'rgba(67, 60, 58, 1)',
    paddingTop: 0,
    paddingLeft: 6,
    paddingRight: 6
  },
  vocabWordStyle: {
    textAlign: 'center',
    fontSize: platform === 'ios' ? 32 : 30,
    color: 'rgba(67, 60, 58, 1)',
    fontWeight: 'bold'
  },
  descriptionStyle: {
    textAlign: 'center',
    fontSize: platform === 'ios' ? 32 : 30,
    color: 'rgba(67, 60, 58, 1)',
    fontWeight: 'bold',
    paddingBottom: 10
  },
  partsOfSpeechStyle: {
    fontSize: 20,
    paddingBottom: 10,
    color: 'rgba(67, 60, 58, 0.6)'
  },
  phoneticsSymbolStyle: {
    fontSize: 20
  },
  completedContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
