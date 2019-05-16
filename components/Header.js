import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Header, Left, Body, Right, Title } from 'native-base'
import PropTypes from 'prop-types'

class MyHeader extends Component {
  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}
MyHeader.propTypes = {
  title: PropTypes.object
}

export default MyHeader
