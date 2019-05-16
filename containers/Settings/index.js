/* global setTimeout */
import { connect } from 'react-redux'
import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import {
  Platform,
  TouchableHighlight,
  Linking,
  Modal,
  Picker
} from 'react-native'
import {
  View,
  StyleProvider,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Title,
  H1
} from 'native-base'
import { Navigator } from '../../routers/Root'
import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'
import styles from './styles'
import PickerStyle from '../../components/StudyPlanGoalPanel/Picker.style.ios'

import * as selectors from '../../redux-modules/auth/token/selector'
import * as actions from '../../redux-modules/auth/token/actions'

import * as settingsSelector from '../../redux-modules/settings/selector'
import * as settingsActions from '../../redux-modules/settings/actions'

import locations from '../../data/locations'

const _LocationPicker = ({ selectedValue, onValueChange }) =>
  Platform.OS !== 'ios' && !selectedValue ? (
    <Picker
      style={[PickerStyle.normal.planPicker, { width: '100%' }]}
      mode="dropdown"
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      <Picker.Item label={'Please Select'} value={null} key={'please-select'} />
      {locations.map(location => (
        <Picker.Item label={`${location}`} value={location} key={location} />
      ))}
    </Picker>
  ) : (
    <Picker
      style={[PickerStyle.normal.planPicker, { width: '100%' }]}
      mode="dropdown"
      selectedValue={selectedValue}
      onValueChange={onValueChange}
    >
      {locations.map(location => (
        <Picker.Item label={`${location}`} value={location} key={location} />
      ))}
    </Picker>
  )

const mapStateToProps = (state, ownProps) => ({
  user: selectors.selectUser(state.get('token')),
  location: settingsSelector.selectLocation(state.get('settings'))
})

const mapDispatchToProps = dispatch => ({
  onSignOut: () => {
    dispatch(actions.deleteJWT())
  },
  updateLocation: location => {
    dispatch(settingsActions.updateLocation(location))
  }
})

class Settings extends Component {
  state = {
    locationPickerVisible: false,
    locationInPicker: null
  }

  _showLocationPicker = function() {
    this.setState({ locationPickerVisible: true })
  }

  _hideLocationPicker = function() {
    this.setState({ locationPickerVisible: false })
  }

  _updatePickerLocation = function(location) {
    if (!location) {
      return
    }

    this.setState({ locationInPicker: location })
    if (Platform.OS !== 'ios') {
      setTimeout(() => {
        // setTimeout, this is a workaround to avoid redux apply faster than state update
        this._confirmLocationPick()
      }, 200)
    }
  }

  _updateLocation = function(location) {
    this.props.updateLocation(location)
  }

  _confirmLocationPick = function() {
    this._updateLocation(this.state.locationInPicker || locations[0])
    if (Platform.OS === 'ios') {
      this._hideLocationPicker()
    }
  }

  _cancelLocationPick = function() {
    this._hideLocationPicker()
  }

  constructor(props) {
    super(props)
    this._showLocationPicker = this._showLocationPicker.bind(this)
    this._hideLocationPicker = this._hideLocationPicker.bind(this)
    this._updatePickerLocation = this._updatePickerLocation.bind(this)
    this._updateLocation = this._updateLocation.bind(this)
    this._confirmLocationPick = this._confirmLocationPick.bind(this)
    this._cancelLocationPick = this._cancelLocationPick.bind(this)
  }

  componentDidMount() {
    this.setState({ locationInPicker: this.props.location })
  }

  render() {
    return this.props.user ? (
      <StyleProvider style={getTheme(common)}>
        <Container>
          <Header>
            <Body>
              <Title>Settings</Title>
            </Body>
          </Header>
          <Content>
            <List style={styles.listContainer}>
              <H1 style={{ textAlign: 'center' }}>Vocabsmith</H1>
              <Text style={{ textAlign: 'center' }}>Version 1.3.0</Text>
            </List>
            <List style={[styles.listContainer, styles.listSelectable]}>
              <ListItem
                icon
                onPress={() => {
                  Linking.openURL(
                    'mailto:vocabapp@eiceducation.com.cn?subject=I have feedback to share!'
                  )
                }}
              >
                <Left>
                  <Icon name="send" />
                </Left>
                <Body>
                  <Text>Send Feedback</Text>
                </Body>
                <Right />
              </ListItem>
              {Platform.OS === 'ios' ? (
                <ListItem icon onPress={this._showLocationPicker}>
                  <Left>
                    <Icon name="pin" />
                  </Left>
                  <Body>
                    <Text>{this.props.location || 'Select Location'}</Text>
                  </Body>
                  <Right />
                </ListItem>
              ) : (
                <ListItem icon>
                  <Left>
                    <Icon name="pin" />
                  </Left>
                  <Body>
                    <_LocationPicker
                      selectedValue={this.state.locationInPicker}
                      onValueChange={this._updatePickerLocation}
                    />
                  </Body>
                  <Right />
                </ListItem>
              )}
            </List>
            <List style={[styles.listContainer, styles.listSelectable]}>
              <ListItem icon onPress={() => this.props.onSignOut()}>
                <Left>
                  <Icon name="log-out" />
                </Left>
                <Body>
                  <Text>Sign Out - {this.props.user.phone_number}</Text>
                </Body>
                <Right />
              </ListItem>
            </List>
          </Content>
          <Modal visible={this.state.locationPickerVisible}>
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
                  <Text
                    style={[PickerStyle.normal.pickerTitle, { width: '100%' }]}
                  >
                    Please Select Your Location
                  </Text>
                </View>
                <View style={PickerStyle.normal.pickerContent}>
                  <_LocationPicker
                    selectedValue={this.state.locationInPicker}
                    onValueChange={this._updatePickerLocation}
                  />
                </View>
              </View>
              <TouchableHighlight
                onPress={this._confirmLocationPick}
                underlayColor={'rgba(240, 240, 240, 1)'}
                style={PickerStyle.normal.confirmButton}
              >
                <Text style={PickerStyle.normal.confirmButtonText}>
                  Confirm
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this._cancelLocationPick}
                underlayColor={'rgba(240, 240, 240, 1)'}
                style={PickerStyle.normal.cancelButton}
              >
                <Text style={PickerStyle.normal.cancelButtonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </Container>
      </StyleProvider>
    ) : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
