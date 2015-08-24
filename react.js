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
  var instance = new this._currentElement.type()

  var renderedElement = instance.render()

  var renderedComponent = instantiateReactComponent(renderedElement)

  return renderedComponent.mountComponent()
}

var ReactDOMComponent = function(element) {
  this._currentElement = element
}

ReactDOMComponent.prototype.mountComponent = function() {
  var props = this._currentElement.props

  var tagOpen = '<' + this._currentElement.type + '>'
  var tagClose = '</' + this._currentElement.type + '>'

  var renderedComponents = props.children.map(function(element){
    return instantiateReactComponent(element)
  })

  var tagContent = renderedComponents.map(function(component) {
    return component.mountComponent()
  }).join('')

  return tagOpen + tagContent + tagClose
}

function instantiateReactComponent(node) {
  if(typeof node === 'object') {
    if (typeof node.type === 'string') {
      return new ReactDOMComponent(node)
    } else if (typeof node.type === 'function') {
      return new ReactCompositeComponent()
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDOMTextComponent(node)
  }
}

var React = {
  createElement: createElement,
  DOM: DOM
}
