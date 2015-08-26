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

ReactDOMTextComponent.prototype.mountComponent = function(rootID) {
  this._rootID = rootID
  return ('<span data-reactid="' + rootID + '">' + this._currentElement + '</span>')
}

var ReactCompositeComponent = function(element) {
  this._currentElement = element
}

ReactCompositeComponent.prototype.mountComponent = function(rootID) {
  this._rootID = rootID

  var instance = new this._currentElement.type()

  var renderedElement = instance.render()

  this._renderedComponent = instantiateReactComponent(renderedElement)

  return this._renderedComponent.mountComponent(rootID)
}

var ReactDOMComponent = function(element) {
  this._currentElement = element
}

ReactDOMComponent.prototype.mountComponent = function(rootID) {
  this._rootID = rootID

  var props = this._currentElement.props

  var tagOpen = '<' +
    this._currentElement.type +
    this.createMarkupForStyles(props) +
    ' data-reactid="' + this._rootID + '"' +
    '>'

  var tagClose = '</' + this._currentElement.type + '>'

  this._renderedComponents = props.children.map(function(element){
    return instantiateReactComponent(element)
  })

  var subIndex = 0
  var tagContent = this._renderedComponents.map(function(component) {
    var nextID = rootID + '.' + subIndex++
    debugger;
    return component.mountComponent(nextID)
  }).join('')

  return tagOpen + tagContent + tagClose
}

ReactDOMComponent.prototype.createMarkupForStyles = function(props) {
  if(props.className) {
    return ' class=' + props.className + ' '
  } else {
    return ''
  }
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

function createClass(spec) {
  var Constructor = function(props) {
    this.props = props
    this.state = this.getInitialState ? this.getInitialState() : null
  }
  Constructor.prototype = spec

  return Constructor
}

function render(element, container) {
  var topComponent = instantiateReactComponent(element)

  var reactRootID = registerComponent(topComponent, container)

  container.innerHTML = topComponent.mountComponent(reactRootID)
}

// return reactRootID
var instancesByReactRootID = {}
function registerComponent(component, container) {
  var reactRootID = getRootIDString(container)
  instancesByReactRootID[reactRootID] = component
  return reactRootID
}

var containerIndex = 0
function getRootIDString(container) {
  return '.' + containerIndex++
}

var React = {
  createElement: createElement,
  DOM: DOM,
  createClass: createClass,
  render: render,
}

module.exports = React
