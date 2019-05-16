import { StyleSheet } from 'react-native'
import { textColorH3 } from '../../native-base-theme/variables/commonColor'

export default StyleSheet.create({
  card: {
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'white'
  },

  planTrigger: {
    flexDirection: 'row',
    paddingBottom: 15
  },

  planIconiOS: {
    fontSize: 18,
    lineHeight: 20,
    color: textColorH3
  },

  planIconAndroid: {
    fontSize: 18,
    lineHeight: 22,
    color: textColorH3
  },

  pickerAndroid: {
    color: '#2F4E77'
  },

  dropdownPickerText: {
    fontSize: 2,
    color: 'yellow'
  },

  stat: {
    width: '50%',
    lineHeight: 35
  },

  statNumber: {
    textAlign: 'right'
  },

  studyPlanOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flexDirection: 'row',
    flex: 1
  },

  notFinishedStatus: {
    textAlign: 'right',
    color: 'rgba(67, 60, 58, 0.6)',
    fontSize: 15
  }

});
