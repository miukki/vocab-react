import jwtDecode from 'jwt-decode'

export const selectUser = state => {
  return state.toJS().jwt && jwtDecode(state.toJS().jwt).user
}

export const selectBgImgIndexBySignUpDate = state => {
  const IMAGES_AMOUNT = 50
  const IMAGE_CHANGE_DAYS = 2

  const daysOfLoop = IMAGE_CHANGE_DAYS * IMAGES_AMOUNT

  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  const signUpDate = new Date(
    // have to `.substr(0, 10)` because safari can't parse time string with timezone
    // reference: https://stackoverflow.com/a/6428201/811653
    state.toJS().jwt &&
      jwtDecode(state.toJS().jwt).user.created_at.substr(0, 10)
  )

  // how many days from user signed up
  const diffDays = Number.parseInt(
    Math.abs((signUpDate.getTime() - Date.now()) / oneDay)
  )

  const daysInCurrentLoop =
    diffDays - Number.parseInt(diffDays / daysOfLoop) * daysOfLoop

  // imageIndex start from 0
  const imageIndex = Number.parseInt(daysInCurrentLoop / IMAGE_CHANGE_DAYS)
  return imageIndex
}
