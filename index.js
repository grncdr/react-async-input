var React = require('react')

module.exports = asyncInput

function asyncInput (ctor) {
  return React.createClass({
    getInitialState: function () {
      return {value: this.props.value}
    },

    onChange: function (e) {
      var handler = this.props.onChange
      if (handler) {
        handler(e)
        this.setState({value: e.target.value})
      }
    },

    componentWillReceiveProps: function (newProps) {
      this.setState({value: newProps.value})
    },

    render: function () {
      return React.createElement(
        ctor,
        React.__spread({}, this.props, {
          value: this.state.value,
          onChange: this.onChange
        }),
        this.props.children
      )
    }
  })
}

asyncInput.monkeyPatch = function (DOM) {
  DOM = DOM || React.DOM;
  DOM.input = asyncInput(DOM.input)
  DOM.textarea = asyncInput(DOM.textarea)
  DOM.option = asyncInput(DOM.option)
}
