// @flow
import React from 'react'
import { View, Button, Text, H1 } from 'native-base'
import { Image } from 'react-native'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import styles from '../../containers/Login/styles'
import commonMessages from '../../messages'
import messages from './messages'

const WelcomView = ({ intl, ...props }) => (
  <View>
    <View
      style={{
        flex: 1,
        alignItems: 'center'
      }}
    >
      <Image
        source={require('../../img/welcome.png')}
        style={{ width: 100, height: 100, margin: 20 }}
      />
      <H1>{intl.formatMessage(commonMessages.name)}</H1>
      <Text>{intl.formatMessage(messages.welcome)}</Text>
    </View>
    <View style={styles.buttonGroup}>
      <Button block onPress={props.onShowSignUp}>
        <Text>{intl.formatMessage(messages.signUpBtn)}</Text>
      </Button>
      <Button
        block
        bordered
        style={styles.buttonSpacer}
        onPress={props.onShowSignIn}
      >
        <Text>{intl.formatMessage(messages.signInBtn)}</Text>
      </Button>
    </View>
  </View>
)

WelcomView.propTypes = {
  onForgotPasswordChangeMobile: PropTypes.func
}

WelcomView.displayName = 'WelcomView'

export default injectIntl(WelcomView)
