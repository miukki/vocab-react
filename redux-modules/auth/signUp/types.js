const prefix = 'auth/signUp'

const types = {}
types.set = function(type) {
  this[type] = `${prefix}/${type}`
}

types.set('SHOW')
types.set('HIDE')

types.set('CHANGE_MOBILE')
types.set('SEND_VCODE')
types.set('SEND_VCODE_DONE')
types.set('COUNTDOWN_VCODE')
types.set('CHANGE_VCODE')
types.set('CHANGE_PASSWORD')
types.set('SHOW_PASSWORD')
types.set('HIDE_PASSWORD')
types.set('SUBMIT')
types.set('SUBMIT_DONE')
types.set('SHOW_ERROR')
types.set('DISMISS_ERROR')
types.set('RESET_STATE')

export default types
