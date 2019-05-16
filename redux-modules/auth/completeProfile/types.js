const prefix = 'auth/completeProfile'

const types = {}
types.set = function(type) {
  this[type] = `${prefix}/${type}`
}

types.set('SHOW')
types.set('HIDE')

types.set('CHANGE_NAME')
types.set('SUBMIT')
types.set('SUBMIT_DONE')
types.set('SHOW_ERROR')
types.set('DISMISS_ERROR')
types.set('RESET_STATE')

export default types
