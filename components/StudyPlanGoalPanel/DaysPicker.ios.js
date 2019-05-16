import React from 'react' // eslint-disable-line no-unused-vars
import {
  TouchableOpacity,
  Picker,
  Modal,
  TouchableHighlight
} from 'react-native'
import { Text, View, Icon, H3, StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import styles from './styles'
import PickerStyle from './Picker.style'

// import { VocabPlanPicker } from 'prepsmith-react-native-components'

export default props => (
  <View>
    <TouchableOpacity
      style={{ flexDirection: 'row' }}
      onPress={props.onShowDaysPicker}
    >
      <H3 style={{ flex: 1, color: '#2F4E77' }}>
        {props.dailyWordsAmount.toString() /* TODO: should be confirmed value */}{' '}
        words/day
      </H3>
      <View
        style={{
          width: 25,
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
      >
        <Icon name="arrow-dropdown" active style={styles.planIconiOS} />
      </View>
    </TouchableOpacity>
    <Modal
      onRequestClose={() => {}}
      animationType="fade"
      transparent
      visible={props.showDaysPicker}
    >
      <View
        style={[
          PickerStyle.normal.bottomModal,
          {
            flex: 1,
            padding: 5,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }
        ]}
      >
        <View style={PickerStyle.normal.pickerContainer}>
          <View style={PickerStyle.normal.pickerContent}>
            <Text style={PickerStyle.normal.pickerTitle}>Words Daily</Text>
            <Text style={PickerStyle.normal.pickerTitle}>Days To Finish</Text>
          </View>
          <View style={PickerStyle.normal.pickerContent}>
            <Picker
              style={PickerStyle.normal.planPicker}
              selectedValue={props.pickerDailyWordsAmount}
              onValueChange={value => props.changeDailyWordsAmount(value)}
            >
              {props.dailyWordsAmounts.map(dailyWordsAmount => (
                <Picker.Item
                  key={dailyWordsAmount}
                  label={dailyWordsAmount.toString()}
                  value={dailyWordsAmount}
                />
              ))}
            </Picker>
            <Picker
              style={PickerStyle.normal.planPicker}
              selectedValue={props.pickerDaysAmount}
              onValueChange={value => props.changeDaysAmount(value)}
            >
              {props.daysAmounts.map(daysAmount => (
                <Picker.Item
                  key={daysAmount}
                  label={daysAmount.toString()}
                  value={daysAmount}
                />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableHighlight
          underlayColor={'rgba(240, 240, 240, 1)'}
          style={PickerStyle.normal.confirmButton}
          onPress={() => {
            props.onHideDaysPicker()
            props.onConfirmDaysPicker()
          }}
        >
          <Text style={PickerStyle.normal.confirmButtonText}>Confirm</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'rgba(240, 240, 240, 1)'}
          style={PickerStyle.normal.cancelButton}
          onPress={props.onHideDaysPicker}
        >
          <Text style={PickerStyle.normal.cancelButtonText}>Cancel</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  </View>
)
