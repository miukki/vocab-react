import { connect } from 'react-redux'
import React from 'react'
import {
  View,
  Header,
  Title,
  Body,
  Button,
  Content,
  Left,
  Right,
  StyleProvider,
  Icon
} from 'native-base'

import * as signInActions from '../../redux-modules/auth/signIn/actions'
import * as signUpActions from '../../redux-modules/auth/signUp/actions'
import * as forgotPasswordActions from '../../redux-modules/auth/forgotPassword/actions'
import * as completeProfileActions from '../../redux-modules/auth/completeProfile/actions'

import * as signInSelector from '../../redux-modules/auth/signIn/selector'
import * as signUpSelector from '../../redux-modules/auth/signUp/selector'
import * as forgotPasswordSelector from '../../redux-modules/auth/forgotPassword/selector'
import * as completeProfileSelector from '../../redux-modules/auth/completeProfile/selector'

import getTheme from '../../native-base-theme/components'
import common from '../../native-base-theme/variables/commonColor'

import CompleteProfileView from '../../components/auth/CompleteProfileView'
import ForgotPasswordView from '../../components/auth/ForgotPasswordView'
import WelcomView from '../../components/auth/WelcomView'
import SignUpView from '../../components/auth/SignUpView'
import SignInView from '../../components/auth/SignInView'

const Auth = ({ navigation, ...props }) => {
  const showWelcome =
    props.signUpShow === false &&
    props.signInShow === false &&
    props.forgotPasswordShow === false &&
    props.completeProfileShow === false

  return (
    <StyleProvider style={getTheme(common)}>
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            {!showWelcome ? (
              <Button transparent onPress={props.backToWelcome}>
                <Icon name="arrow-back" />
              </Button>
            ) : null}
          </Left>
          <Body>
            <Title>
              {(() => {
                if (props.signUpShow) {
                  return 'Sign Up'
                }
                if (props.signInShow) {
                  return 'Login'
                }
                if (props.forgotPasswordShow) {
                  return 'Forgot Password'
                }
                return 'Welcome'
              })()}
            </Title>
          </Body>
          <Right>
            <Button transparent />
          </Right>
        </Header>
        <Content padder>
          {showWelcome ? <WelcomView {...props} /> : null}
          {props.signUpShow ? <SignUpView {...props} /> : null}
          {props.forgotPasswordShow ? <ForgotPasswordView {...props} /> : null}
          {props.signInShow ? <SignInView {...props} /> : null}
          {props.completeProfileShow ? (
            <CompleteProfileView {...props} />
          ) : null}
        </Content>
      </View>
    </StyleProvider>
  )
}

const mapStateToProps = (state, ownProps) => ({
  // complete Profile
  completeProfileShow: completeProfileSelector.selectShow(
    state.get('completeProfile')
  ),
  completeProfileSubmitting: completeProfileSelector.selectSubmitting(
    state.get('completeProfile')
  ),
  completeProfileName: completeProfileSelector.selectName(
    state.get('completeProfile')
  ),
  completeProfileHasError: completeProfileSelector.selectHasError(
    state.get('completeProfile')
  ),
  completeProfileErrorTypes: completeProfileSelector.selectErrorTypes(
    state.get('completeProfile')
  ),
  // forgot password states
  forgotPasswordVcodeCountdown: forgotPasswordSelector.selectVcodeCountdown(
    state.get('forgotPassword')
  ),
  forgotPasswordVcodeSentAt: forgotPasswordSelector.selectVcodeSentAt(
    state.get('forgotPassword')
  ),
  forgotPasswordVcodeSending: forgotPasswordSelector.selectVcodeSending(
    state.get('forgotPassword')
  ),
  forgotPasswordVcode: forgotPasswordSelector.selectVcode(
    state.get('forgotPassword')
  ),
  forgotPasswordHasError: forgotPasswordSelector.selectHasError(
    state.get('forgotPassword')
  ),
  forgotPasswordErrorTypes: forgotPasswordSelector.selectErrorTypes(
    state.get('forgotPassword')
  ),
  forgotPasswordSubmitting: forgotPasswordSelector.selectSubmitting(
    state.get('forgotPassword')
  ),
  forgotPasswordMobile: forgotPasswordSelector.selectMobile(
    state.get('forgotPassword')
  ),
  forgotPasswordPassword: forgotPasswordSelector.selectPassword(
    state.get('forgotPassword')
  ),
  forgotPasswordShowPassword: forgotPasswordSelector.selectShowPassword(
    state.get('forgotPassword')
  ),
  forgotPasswordShow: forgotPasswordSelector.selectShow(
    state.get('forgotPassword')
  ),
  // sign-up states
  signUpVcodeCountdown: signUpSelector.selectVcodeCountdown(
    state.get('signUp')
  ),
  signUpVcodeSentAt: signUpSelector.selectVcodeSentAt(state.get('signUp')),
  signUpVcodeSending: signUpSelector.selectVcodeSending(state.get('signUp')),
  signUpVcode: signUpSelector.selectVcode(state.get('signUp')),
  signUpErrorTypes: signUpSelector.selectErrorTypes(state.get('signUp')),
  signUpHasError: signUpSelector.selectHasError(state.get('signUp')),
  signUpSubmitting: signUpSelector.selectSubmitting(state.get('signUp')),
  signUpMobile: signUpSelector.selectMobile(state.get('signUp')),
  signUpPassword: signUpSelector.selectPassword(state.get('signUp')),
  signUpShowPassword: signUpSelector.selectShowPassword(state.get('signUp')),
  signUpShow: signUpSelector.selectShow(state.get('signUp')),

  // sign-in states
  signInHasError: signInSelector.selectHasError(state.get('signIn')),
  signInErrorTypes: signInSelector.selectErrorTypes(state.get('signIn')),
  signInSubmitting: signInSelector.selectSubmitting(state.get('signIn')),
  signInMobile: signInSelector.selectMobile(state.get('signIn')),
  signInPassword: signInSelector.selectPassword(state.get('signIn')),
  signInShowPassword: signInSelector.selectShowPassword(state.get('signIn')),
  signInShow: signInSelector.selectShow(state.get('signIn'))
})

const mapDispatchToProps = dispatch => ({
  //complete Profile
  onCompleteProfileSubmit: value => {
    dispatch(completeProfileActions.submit())
  },

  onCompleteProfileChangeName: value => {
    dispatch(completeProfileActions.changeName(value))
  },

  onCompleteProfileDismissError: () => {
    dispatch(completeProfileActions.dismissError())
  },

  //forgot password actions
  onForgotPasswordChangeMobile: value => {
    dispatch(forgotPasswordActions.changeMobile(value))
  },
  onForgotPasswordSendVcode: mobile => {
    dispatch(forgotPasswordActions.sendVcode(mobile))
  },
  onForgotPasswordCountdownVcode: mobile => {
    dispatch(forgotPasswordActions.countdownVcode(mobile))
  },
  onForgotPasswordChangeVcode: value => {
    dispatch(forgotPasswordActions.changeVcode(value))
  },
  onForgotPasswordChangePassword: value => {
    dispatch(forgotPasswordActions.changePassword(value))
  },
  onForgotPasswordShowPassword: () => {
    dispatch(forgotPasswordActions.showPassword())
  },
  onForgotPasswordHidePassword: () => {
    dispatch(forgotPasswordActions.hidePassword())
  },
  onForgotPasswordSubmit: value => {
    dispatch(forgotPasswordActions.submit())
  },
  onForgotPasswordDismissError: () => {
    dispatch(forgotPasswordActions.dismissError())
  },
  //sign-up actions
  onSignUpChangeMobile: value => {
    dispatch(signUpActions.changeMobile(value))
  },
  onSignUpSendVcode: mobile => {
    dispatch(signUpActions.sendVcode(mobile))
  },
  onSignUpCountdownVcode: mobile => {
    dispatch(signUpActions.countdownVcode(mobile))
  },
  onSignUpChangeVcode: value => {
    dispatch(signUpActions.changeVcode(value))
  },
  onSignUpChangePassword: value => {
    dispatch(signUpActions.changePassword(value))
  },
  onSignUpShowPassword: () => {
    dispatch(signUpActions.showPassword())
  },
  onSignUpHidePassword: () => {
    dispatch(signUpActions.hidePassword())
  },
  onSignUpSubmit: value => {
    dispatch(signUpActions.submit())
  },
  onSignUpDismissError: () => {
    dispatch(signUpActions.dismissError())
  },

  // sign-in actions
  onSignInChangeMobile: value => {
    dispatch(signInActions.changeMobile(value))
  },
  onSignInChangePassword: value => {
    dispatch(signInActions.changePassword(value))
  },
  onSignInShowPassword: () => {
    dispatch(signInActions.showPassword())
  },
  onSignInHidePassword: () => {
    dispatch(signInActions.hidePassword())
  },
  onSignInSubmit: () => {
    dispatch(signInActions.submit())
  },
  onSignInDismissError: () => {
    dispatch(signInActions.dismissError())
  },

  // panel actions
  backToWelcome: () => {
    dispatch(signUpActions.hide())
    dispatch(signInActions.hide())
    dispatch(forgotPasswordActions.hide())
  },
  onShowSignIn: () => {
    dispatch(signUpActions.hide())
    dispatch(signInActions.show())
    dispatch(forgotPasswordActions.hide())
  },
  onShowSignUp: () => {
    dispatch(signUpActions.show())
    dispatch(signInActions.hide())
    dispatch(forgotPasswordActions.hide())
  },
  onShowForgotPassword: () => {
    dispatch(signUpActions.hide())
    dispatch(signInActions.hide())
    dispatch(forgotPasswordActions.show())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
