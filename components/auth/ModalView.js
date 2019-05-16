// @flow
import React from 'react'
import { Modal } from 'react-native'
import { View, Button, Text } from 'native-base'
import PropTypes from 'prop-types'
import styles from '../../containers/Login/styles'

const ModalView = ({ dismissFn, hasError, errorTypes, ...props }) => {
  return (
    <Modal animationType="fade" transparent visible={hasError}>
      <View style={styles.modal}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <View style={styles.modalWrapper}>
            <View
              style={{
                marginBottom: 15,
                alignItems: 'center'
              }}
            >
              {errorTypes.length &&
                errorTypes.map(type => {
                  return type === 'hitRateLimit' ? (
                    <Text key={type}>
                      Hit SMS sending limitation, please try 2 minutes later.
                    </Text>
                  ) : type === 'userAlreadyExist' ? (
                    <Text key={type}>
                      Phone already used, please choose another one.
                    </Text>
                  ) : type === 'userNotExist' ? (
                    <Text>User Not Exist</Text>
                  ) : type === 'wrongVcode' ? (
                    <Text key={type}>Verification Code Error</Text>
                  ) : type === 'wrongName' ? (
                    <Text key={type}>Name Error</Text>
                  ) : type === 'serverError' ? (
                    <Text key={type}>Server Error</Text>
                  ) : type === 'networkError' ? (
                    <Text key={type}>Network Error</Text>
                  ) : type === 'wrongMobile' ? (
                    <Text key={type}>Wrong Mobile Number</Text>
                  ) : type === 'userPasswordMismatch' ? (
                    <Text key={type}>Username & Password Mismatch</Text>
                  ) : type === 'weakPassword' ? (
                    <View key={type} style={{paddingTop: 10}}>
                      <Text style={{textAlign: 'center'}}>
                        Weak Password. Must contain:
                      </Text>
                      <Text>
                        - 6+ characters
                      </Text>
                      <Text>
                        - Letters AND numbers
                      </Text>
                    </View>
                  ) : type === 'otherError' ? (
                    <Text key={type}>Error</Text>
                  ) : null
                })}
            </View>
            <Button
              block
              onPress={() => {
                dismissFn()
              }}
            >
              <Text>Dismiss</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

ModalView.propTypes = {
  dismissFn: PropTypes.func,
  hasError: PropTypes.bool,
  errorTypes: PropTypes.array
}

ModalView.displayName = 'ModalView'
export default ModalView
