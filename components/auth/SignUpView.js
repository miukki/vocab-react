// @flow
import React from 'react'
import { View, Button, Text, Item, Input, Icon, Form } from 'native-base'
import PropTypes from 'prop-types'
import styles from '../../containers/Login/styles'
import ModalView from './ModalView'
import Ticktack from './Ticktack'
import config from '../../config.js'

const SignUpView = ({ ...props }) => (
  <View>
    <Form>
      <Item regular>
        <Input
          keyboardType="numeric"
          placeholder="Mobile Number"
          disabled={props.signUpSubmitting}
          value={props.signUpMobile}
          onChangeText={props.onSignUpChangeMobile}
        />
        <Button
          small
          style={{ marginTop: 8, marginRight: 8 }}
          onPress={() => props.onSignUpSendVcode(props.signUpMobile)}
          disabled={props.signUpVcodeSending || props.signUpVcodeCountdown > 0}
          warning={
            !props.signUpVcodeSending && props.signUpVcodeCountdown === 0
          }
        >
          {props.signUpVcodeCountdown > 0 ? (
            <Ticktack
              render={seconds => (
                <Text>Send Again{seconds >= 0 ? `(${seconds})` : null}</Text>
              )}
              targetTime={
                props.signUpVcodeSentAt + config.smsCountDownSeconds * 1000
              }
              onDone={props.onSignUpCountdownVcode}
            />
          ) : (
            <Text>
              {props.forgotPasswordVcodeSentAt ? 'Send Again' : 'Send Code'}
            </Text>
          )}
        </Button>
      </Item>
      <Item regular>
        <Input
          keyboardType="numeric"
          placeholder="Verification Code"
          disabled={props.signUpSubmitting}
          value={props.signUpVcode}
          onChangeText={props.onSignUpChangeVcode}
        />
      </Item>
      <Item regular>
        <Input
          placeholder="Password"
          disabled={props.signUpSubmitting}
          value={props.signUpPassword}
          secureTextEntry={!props.signUpShowPassword}
          onChangeText={props.onSignUpChangePassword}
        />
        <Button
          transparent
          onPress={
            props.signUpShowPassword
              ? props.onSignUpHidePassword
              : props.onSignUpShowPassword
          }
        >
          {!props.signUpShowPassword ? (
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
        block
        disabled={props.signUpSubmitting}
        onPress={props.onSignUpSubmit}
      >
        <Text>{props.signUpSubmitting ? 'Submitting...' : 'Sign Up'}</Text>
      </Button>
    </View>
    <ModalView
      dismissFn={props.onSignUpDismissError}
      hasError={props.signUpHasError}
      errorTypes={props.signUpErrorTypes}
      {...props}
    />
  </View>
)

SignUpView.propTypes = {
  onForgotPasswordChangeMobile: PropTypes.func
}

SignUpView.displayName = 'SignUpView'

export default SignUpView
