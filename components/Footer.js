import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import PropTypes from 'prop-types'

class FooterTabsIconExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0
    }
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            onPress={() => {
              this.props.onTabClick(0)
              this.setState({ tabIndex: 0 })
            }}
            vertical
            active={this.state.tabIndex === 0}
          >
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button
            vertical
            active={this.state.tabIndex === 1}
            onPress={() => {
              this.props.onTabClick(1)
              this.setState({ tabIndex: 1 })
            }}
          >
            <Icon name="repeat" />
            <Text>Review</Text>
          </Button>
          <Button
            onPress={() => {
              this.props.onTabClick(2)
              this.setState({ tabIndex: 2 })
            }}
            vertical
            active={this.state.tabIndex === 2}
          >
            <Icon active name="settings" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

FooterTabsIconExample.propTypes = {
  onTabClick: PropTypes.func
}

export default FooterTabsIconExample
