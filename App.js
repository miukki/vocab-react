/* global GLOBAL */
import Expo, { AppLoading, Asset, Font } from 'expo'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Root, Text } from 'native-base'
import { Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Sentry from 'sentry-expo'
import 'intl'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'

import Storage from './lib/Storage'
import configureStore from './store/configure-store'
import RootNav from './routers/Root'

import * as tokenActions from './redux-modules/auth/token/actions'
import * as settingsActions from './redux-modules/settings/actions'

import { vocabAppServiceJsSdk } from './lib/API'

// Remove this once Sentry is correctly setup.
// Sentry.enableInExpoDevelopment = true

// import { SentrySeverity, SentryLog } from 'react-native-sentry';
Sentry.config(
  'https://5c5b24229f124a629d328bf401314be8@sentry.io/1192144'
).install()

class ErrorBoundary extends React.Component {
  componentDidCatch(error) {
    Sentry.captureException(error)
  }

  render() {
    return this.props.children
  }
}

addLocaleData([...en])

const store = configureStore()
window.store = store

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

export default class App extends Component {
  state = {
    isReady: false
  }

  async _loadAssetsAsync() {
    GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

    const imageAssets = cacheImages([
      require('./img/icon-android.png'),
      require('./img/icon.png'),
      require('./img/splash.png'),
      require('./img/welcome.png'),
      require('./img/patterns/1.png'),
      require('./img/patterns/2.png'),
      require('./img/patterns/3.png'),
      require('./img/patterns/4.png'),
      require('./img/patterns/5.png'),
      require('./img/patterns/6.png'),
      require('./img/patterns/7.png'),
      require('./img/patterns/8.png'),
      require('./img/patterns/9.png'),
      require('./img/patterns/10.png'),
      require('./img/patterns/11.png'),
      require('./img/patterns/12.png'),
      require('./img/patterns/13.png'),
      require('./img/patterns/14.png'),
      require('./img/patterns/15.png'),
      require('./img/patterns/16.png'),
      require('./img/patterns/17.png'),
      require('./img/patterns/18.png'),
      require('./img/patterns/19.png'),
      require('./img/patterns/20.png'),
      require('./img/patterns/21.png'),
      require('./img/patterns/22.png'),
      require('./img/patterns/23.png'),
      require('./img/patterns/24.png'),
      require('./img/patterns/25.png'),
      require('./img/patterns/26.png'),
      require('./img/patterns/27.png'),
      require('./img/patterns/28.png'),
      require('./img/patterns/29.png'),
      require('./img/patterns/30.png'),
      require('./img/patterns/31.png'),
      require('./img/patterns/32.png'),
      require('./img/patterns/33.png'),
      require('./img/patterns/34.png'),
      require('./img/patterns/35.png'),
      require('./img/patterns/36.png'),
      require('./img/patterns/37.png'),
      require('./img/patterns/38.png'),
      require('./img/patterns/39.png'),
      require('./img/patterns/40.png'),
      require('./img/patterns/41.png'),
      require('./img/patterns/42.png'),
      require('./img/patterns/43.png'),
      require('./img/patterns/44.png'),
      require('./img/patterns/45.png'),
      require('./img/patterns/46.png'),
      require('./img/patterns/47.png'),
      require('./img/patterns/48.png'),
      require('./img/patterns/49.png'),
      require('./img/patterns/50.png')
    ])

    const fontAssets = cacheFonts([
      { Roboto: require('native-base/Fonts/Roboto.ttf') },
      { Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf') },
      { Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf') },
      { FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf') }
    ])

    await Promise.all([...imageAssets, ...fontAssets])

    window.Expo = Expo
    window.Storage = Storage

    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT)

    // load jwt and go to home panel
    window.Storage.getJWT().then(jwt => {
      if (jwt) {
        window.store.dispatch(tokenActions.setJWT(jwt))
        window.store.dispatch(NavigationActions.navigate({ routeName: 'Tab' }))
        vocabAppServiceJsSdk
          .getLocation(window.store.getState().toJS().token.jwt)
          .catch(err => {})
          .then(res => {
            let remoteLocation = null
            if (res.data && res.data.location) {
              remoteLocation = res.data.location
            }

            return Promise.all([
              Promise.resolve(remoteLocation),
              window.Storage.getLocation()
            ])
          })
          .then(([remoteLocation, location]) => {
            if (location) {
              location = remoteLocation || location
              window.store.dispatch(settingsActions.updateLocation(location))
            }
          })
      }

      // load settings
      window.Storage.getLocation().then(location => {
        if (location) {
          window.store.dispatch(settingsActions.updateLocation(location))
        }
      })
    })
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <ErrorBoundary>
        <IntlProvider locale={'en'} textComponent={Text}>
          <Provider store={store}>
            <Root>
              <RootNav />
            </Root>
          </Provider>
        </IntlProvider>
      </ErrorBoundary>
    )
  }
}
