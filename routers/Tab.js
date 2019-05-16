import React, { Component } from 'react'
import { Platform } from 'react-native'
import { connect } from 'react-redux'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { addNavigationHelpers, TabNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import HomeNav from './HomeNav'
import Review from '../containers/Review'
import Settings from '../containers/Settings'

class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, tintColor }) =>
      focused ? (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ) : (
        <Icon name="ios-home" style={{ color: tintColor }} />
      )
  }

  render() {
    return <HomeNav />
  }
}

class ReviewScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Review',
    tabBarIcon: ({ focused, tintColor }) =>
      focused ? (
        <Icon name="md-repeat" style={{ color: tintColor }} />
      ) : (
        <Icon name="md-repeat" style={{ color: tintColor }} />
      )
  }

  render() {
    return <Review />
  }
}

class SettingsScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused, tintColor }) =>
      focused ? (
        <Icon name="ios-settings" style={{ color: tintColor }} />
      ) : (
        <Icon name="ios-settings" style={{ color: tintColor }} />
      )
  }

  render() {
    return <Settings />
  }
}

export const Navigator = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: false
      }
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: {
        title: 'Review'
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings'
      }
    }
  },
  {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: '#007aff',
      inactiveTintColor: '#6A6A6A',
      indicatorStyle: {
        opacity: 0
      },
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        margin: 2
      },
      iconStyle: {
        height: Platform.OS === 'ios' ? 25 : 24,
        width: Platform.OS === 'ios' ? 25 : 24
      },
      tabStyle: {
        height: 55
      },
      style: {
        backgroundColor: Platform.OS === 'ios' ? null : '#F7F7F7'
      }
    }
  }
)

const initialState = Immutable.fromJS(
  Navigator.router.getStateForAction(
    Navigator.router.getActionForPathAndParams('Home')
  )
)

export const reducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state.toJS())

  // Simply return the original `state` if `nextState` is null or undefined.
  return state.merge(nextState)
}

const Nav = props => {
  const addListener = createReduxBoundAddListener('root')
  return (
    <Navigator
      navigation={addNavigationHelpers({
        dispatch: props.dispatch,
        state: props.nav,
        addListener
      })}
    />
  )
}

Nav.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object
}

const mapStateToProps = state => ({
  nav: state.get('tabNav').toJS()
})

export default connect(mapStateToProps)(Nav)
