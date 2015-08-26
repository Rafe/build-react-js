jest.dontMock('../react')

var React = require('../react')

// step 1: let's create element!

describe('React.createElement', function() {
  it('holds type and props', function() {
    var element = React.DOM.div({ className: 'button' }, null)
    expect(element.type).toEqual('div')
    expect(element.props.className).toEqual('button')
  })
})

describe('React.DOM')

describe('React.createClass')

describe('instantiateReactComponent')
