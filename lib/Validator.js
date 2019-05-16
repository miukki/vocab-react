import _ from 'lodash'

export default class Validator {
  static isMobileNumberCorrect(mobile) {
    return !_.isEmpty(mobile) && mobile.length === 11 && /\d+/.test(mobile)
  }
  static isVcodeCorrect(vcode) {
    return !_.isEmpty(vcode) && /\d+/.test(vcode) && vcode.length === 6
  }
  static isHasSymbols(str) {
    return /[-!$%^&*()_+|~=`{}\\[\]:";'<>?,./]/.test(str)
  }
  static isStrongPassword(pswrd) {
    return (
      !_.isEmpty(pswrd) &&
      pswrd.length >= 6 &&
      /([0-9]+)/.test(pswrd) &&
      /([a-zA-Z]+)/.test(pswrd)
    )
  }
  static isNameCorrect(name) {
    return !_.isEmpty(name) && !this.isHasSymbols(name) && name.length >= 1
  }

  static isAnyValidateError(error) {
    let hasError = _.filter(_.toArray(error), i => i === true)
    return !!hasError.length
  }

  static getErrorTypes(state) {
    let errosTypes = []
    const error = state.toJS().error
    if (!Validator.isAnyValidateError(error)) {
      return errosTypes
    }
    for (let key in error) {
      if (error[key]) {
        errosTypes.push(key)
      }
    }
    return errosTypes
  }
}
