// @flow
import React from 'react'
import { View, Button, Text, Item, Input, Form } from 'native-base'
import PropTypes from 'prop-types'
import styles from '../../containers/Login/styles'
import ModalView from './ModalView'

const CompleteProfileView = ({ navigation, ...props }) => (
  <View>
    <Form>
      <Text style={styles.formLabel}>Your name</Text>
      <Item regular>
        <Input
          placeholder="Your name"
          disabled={props.completeProfileSubmitting}
          value={props.completeProfileName}
          onChangeText={props.onCompleteProfileChangeName}
        />
      </Item>
    </Form>
    <View style={styles.buttonGroup}>
      <Button
        iconLeft
        block
        disabled={props.completeProfileSubmitting}
        onPress={props.onCompleteProfileSubmit}
      >
        <Text>
          {props.completeProfileSubmitting ? 'Submitting...' : 'Submit'}
        </Text>
      </Button>
    </View>
    <ModalView
      hasError={props.completeProfileHasError}
      dismissFn={props.onCompleteProfileDismissError}
      errorTypes={props.completeProfileErrorTypes}
      {...props}
    />
  </View>
)

CompleteProfileView.propTypes = {
  onCompleteProfileSubmit: PropTypes.func,
  onCompleteProfileChangeName: PropTypes.func,
  onCompleteProfileDismissError: PropTypes.func
}

CompleteProfileView.displayName = 'CompleteProfileView'

export default CompleteProfileView
