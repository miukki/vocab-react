// @flow
import React from 'react'
import { View, Button, Text, Item, Input, Icon, Form } from 'native-base'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import styles from '../../containers/Login/styles'
import ModalView from './ModalView'
import messages from './messages'

const SignInView = ({ intl, ...props }) => (
  <View>
    <Form>
      <Item regular>
        <Input
          disabled={props.signInSubmitting}
          keyboardType="numeric"
          placeholder={intl.formatMessage(messages.mobileNunmberInput)}
          value={props.signInMobile}
          onChangeText={props.onSignInChangeMobile}
        />
      </Item>
      <Item regular>
        <Input
          disabled={props.signInSubmitting}
          secureTextEntry={!props.signInShowPassword}
          placeholder={intl.formatMessage(messages.passwordInput)}
          value={props.signInPassword}
          onChangeText={props.onSignInChangePassword}
        />
        <Button
          transparent
          onPress={
            props.signInShowPassword
              ? props.onSignInHidePassword
              : props.onSignInShowPassword
          }
        >
          {!props.signInShowPassword ? (
            <Icon active name="ios-eye" />
          ) : (
            <Icon active name="ios-eye-off" />
          )}
        </Button>
      </Item>
    </Form>
    <View style={styles.buttonGroup}>
      <Button
        iconLeft
        disabled={props.signInSubmitting}
        block
        onPress={props.onSignInSubmit}
      >
        <Text>{props.signInSubmitting ? 'Submitting...' : 'Login'}</Text>
      </Button>
      <Button
        block
        transparent
        style={styles.buttonSpacer}
        onPress={props.onShowForgotPassword}
      >
        <Text>{intl.formatMessage(messages.forgotPasswordBtn)}</Text>
      </Button>
    </View>
    <ModalView
      hasError={props.signInHasError}
      dismissFn={props.onSignInDismissError}
      errorTypes={props.signInErrorTypes}
      {...props}
    />
  </View>
)

SignInView.propTypes = {
  onForgotPasswordChangeMobile: PropTypes.func
}

SignInView.displayName = 'SignInView'

export default injectIntl(SignInView)
