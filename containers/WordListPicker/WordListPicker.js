import React from 'react'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback, ScrollView } from 'react-native'
import { ProgressListPicker } from 'prepsmith-react-native-components'
import * as selector from '../../redux-modules/wordlist/selector'

const mapStateToProps = (state, ownProps) => ({
  items: selector.selectItems(state.toJS()),
  selectable: selector.selectSelectable(state.toJS())
})

const Container = props => {
  // workaround to avoid black screen when call goBack before animation complete
  return props.selectable ? (
    <ScrollView>
      <ProgressListPicker {...props} />
    </ScrollView>
  ) : (
    <TouchableWithoutFeedback onPress={() => {}}>
      <ProgressListPicker {...props} />
    </TouchableWithoutFeedback>
  )
}

export default connect(mapStateToProps)(Container)
