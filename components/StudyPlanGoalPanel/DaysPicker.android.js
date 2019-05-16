import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Platform, Picker } from 'react-native'
import styles from './styles'

export default class DaysPicker extends Component {
  constructor(props) {
    super(props)
    this.state = { dailyWordsAmount: props.dailyWordsAmount }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.dailyWordsAmount !== nextProps.dailyWordsAmount) {
      this.setState({ dailyWordsAmount: nextProps.dailyWordsAmount })
    }
  }

  render() {
    const props = this.props
    return (
      <Picker
        mode="dropdown"
        selectedValue={this.state.dailyWordsAmount}
        onValueChange={value => {
          this.setState({ dailyWordsAmount: value })
          props.changeDailyWordsAmountWithoutConfirm(value)
        }}
        style={
          /* workaround to pass test */
          Platform.OS === 'android' ? styles.pickerAndroid : null
        }
      >
        {props.dailyWordsAmounts.map(words => (
          <Picker.Item label={`${words} words`} value={words} key={words} />
        ))}
      </Picker>
    )
  }
}
