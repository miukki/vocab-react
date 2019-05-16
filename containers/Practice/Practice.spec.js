import React from 'react' // eslint-disable-line no-unused-vars
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import Immutable from 'immutable'
import AnswerSelectionPicker from './'

Enzyme.configure({ adapter: new Adapter() })
const shallow = Enzyme.shallow
jest.mock('../../redux-modules/practice/actions')

const mockStore = configureStore([])

describe('AnswerSelectionPicker container', function() {
  const answer = { text: 'text' }
  let component

  beforeAll(() => {
    const testState = Immutable.fromJS({
      practice: {
        selected: 1,
        answers: [answer]
      },
      studyPlan: {
        learnedWords: [],
        checkinLogs: []
      }
    })
    const store = mockStore(testState)
    component = shallow(<AnswerSelectionPicker />, { context: { store } })
  })

  it('should map state to props', () => {
    expect(component.props().selected).toBe(1)
    expect(component.props().answers).toEqual([answer])
  })
})
