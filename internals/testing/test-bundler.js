/* global document */
const Enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

// https://blog.joinroot.com/mounting-react-native-components-with-enzyme-and-jsdom/
require('react-native-mock-render/mock')

const jsdom = require('jsdom').jsdom
global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})
