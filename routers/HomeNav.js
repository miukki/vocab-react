import React from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'native-base'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import StudyPlan from '../containers/StudyPlan'
import WordsListPicker from '../containers/WordListPicker'

export const Navigator = StackNavigator(
  {
    StudyPlan: {
      screen: StudyPlan,
      navigationOptions: {
        headerTitle: 'StudyPlan',
        header: null
      }
    },
    SelectWordsList: {
      screen: WordsListPicker
    }
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 100,
        containerStyle: {
          backgroundColor: 'transparent'
        }
      }
    })
  }
)

const initialState = Immutable.fromJS(
  Navigator.router.getStateForAction(
    Navigator.router.getActionForPathAndParams('StudyPlan')
  )
)

export const reducer = (state = initialState, action) => {
  const nextState = Navigator.router.getStateForAction(action, state.toJS())

  // Simply return the original `state` if `nextState` is null or undefined.
  return state.merge(nextState)
}

class Nav extends React.Component {
  render() {
    const addListener = createReduxBoundAddListener('root')
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
      />
    )
  }
}

Nav.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object
}

const mapStateToProps = state => ({
  nav: state.get('homeNav').toJS()
})

export default connect(mapStateToProps)(Nav)
