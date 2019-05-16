/* global clearInterval setInterval */
import React from 'react'

export default class Ticktack extends React.Component {
  state = {
    seconds: null
  }

  _tick() {
    if (!this.props.targetTime || this.props.targetTime - Date.now() < 0) {
      this.setState({ seconds: null })
      if (this.props.onDone) {
        this.props.onDone()
      }

      return clearInterval(this.timerID)
    }

    const seconds = Number.parseInt(
      (this.props.targetTime - Date.now()) / 1000,
      10
    )
    this.setState({ seconds })
  }

  componentDidMount() {
    this._tick()
    this.timerID = setInterval(() => this._tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  render() {
    return this.props.render(this.state.seconds)
  }
}
