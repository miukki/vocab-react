const prefix = 'auth/signIn'

const types = {}
types.set = function(type) {
  this[type] = `${prefix}/${type}`
}

types.set('SHOW')
types.set('HIDE')

types.set('CHANGE_MOBILE')
types.set('CHANGE_PASSWORD')
types.set('SHOW_PASSWORD')
types.set('HIDE_PASSWORD')
types.set('SUBMIT')
types.set('SUBMIT_DONE')
types.set('SHOW_ERROR')
types.set('DISMISS_ERROR')
types.set('GO_FORGOT_PASSWORD')
types.set('RESET_STATE')

export default types
