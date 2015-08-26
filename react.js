var ReactElement = function(type, props) {
  this.type = type
  this.props = props
}

var createElement = function(type, config, children) {
  var props = {}
  for (propName in config) {
    props[propName] = config[propName]
  }
  props.children = children

  return new ReactElement(type, props)
}

var DOM = {};
['div', 'a', 'h1', 'p'].forEach(function(type) {
  DOM[type] = createElement.bind(null, type)
})

// ReactCompositeComponent ,ReactDOMComponent, ReactDOMTextComponent
var ReactDOMTextComponent = function(text) {
  this._currentElement = text
}

var ReactCompositeComponent = function(element) {
  this._currentElement = element
}

var ReactDOMComponent = function(element) {
  this._currentElement = element
}

function instantiateReactComponent(node) {
  if(typeof node === 'object') {
    if (typeof node.type === 'string') {
      return new ReactDOMComponent(node)
    } else if (typeof node.type === 'function') {
      return new ReactCompositeComponent(node)
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDOMTextComponent(node)
  }
}

var React = {
  createElement: createElement,
  DOM: DOM,

  // for testing purpose
  ReactDOMTextComponent: ReactDOMTextComponent,
  ReactDOMComponent: ReactDOMComponent,
  ReactCompositeComponent: ReactCompositeComponent,
  instantiateReactComponent: instantiateReactComponent,
}

if(typeof module !== 'undefined') {
  module.exports = React
}
