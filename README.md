# react-async-input

Wrap React inputs so that asynchrous updates don't cause the cursor to jump
around.

## Warning! Old and unmaintained!

I haven't been keeping up with React/maintaining anything that uses it, so this library is compatible with React **0.9.x**. It **may or may not work with new versions of React**. If you use React and this library, send a PR and I will grant you ownership of the package on npm.

## Synopsis

```
var DOM = require('react').DOM
var asyncInput = require('react-async-input')

var input = asyncInput(DOM.input)

// Or monkey-patch React.DOM, don't do this in a library!
// asyncInput.monkeyPatch(DOM)

react.createClass({
  getInitialState: function () {
    this.setState({name: 'Jerry! Sizzlah!'})
  },

  render: function () {
    return DOM.div(null, [
      DOM.label(null, 'Name:'),
      input({
        type: 'number',
        value: this.state.name,
        onChange: this.handleNameChange
      })
    ])
  },

  // this asynchronous event handler no longer causes the cursor to jump around
  handleNameChange: function (event) {
    process.nextTick(function () {
      this.setState({name: event.target.value})
    }.bind(this))
  }
})
```

## Acknowledgements

I copied this technique from [swannodette/om](https://github.com/swannodette/om)
after dnolen told me about it. All credit to him for solving a problem I didn't
know I was going to have before I even had it.

## License

Licensed under the EPL (same as Om)
