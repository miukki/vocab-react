const prefix = 'auth/token'

const types = {}
types.set = function(type) {
  this[type] = `${prefix}/${type}`
}

types.set('SET_JWT')
types.set('DELETE_JWT')

export default types
