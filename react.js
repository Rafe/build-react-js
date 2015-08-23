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

ReactDOMTextComponent.prototype.mountComponent = function() {
  return ('<span>' + this._currentElement + '</span>')
}

var ReactCompositeComponent = function(element) {
  this._currentElement = element
}

ReactCompositeComponent.prototype.mountComponent = function() {
}

var ReactDOMComponent = function(element) {
  this._currentElement = element
}

function instantiateReactComponent(node) {
  if(typeof node === 'object') {
    if (typeof node.type === 'string') {
      return new ReactDOMComponent(node)
    else if (typeof node.type === 'function')
      return new ReactCompositeComponent()
    }
  else if (typeof node === 'string' || typeof node === 'number') {
    return new ReactTextComponent(node)
  }
}

var React = {
  createElement: createElement,
  DOM: DOM
}
