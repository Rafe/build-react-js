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

ReactDOMTextComponent.prototype.receiveComponent = function(nextText) {
  if(this._currentElement != nextText) {
    var node = React.getNode(this._rootID)
    node.innerHTML = nextText
  }
}

var ReactCompositeComponent = function(element) {
  this._currentElement = element
}

ReactCompositeComponent.prototype.mountComponent = function(rootID) {
  this._rootID = rootID

  var instance = new this._currentElement.type(this._currentElement.props, this)

  var renderedElement = instance.render()

  this._renderedComponent = instantiateReactComponent(renderedElement)

  return this._renderedComponent.mountComponent(rootID)
}

ReactCompositeComponent.prototype.receiveComponent = function(nextElement) {
  this._renderedComponent.receiveComponent(nextElement)
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

  if(props.onClick) {
    ReactEventEmitter.putListener(rootID, 'onClick', props.onClick)
  }

  var tagClose = '</' + this._currentElement.type + '>'

  if(props.children) {
    this._renderedComponents = props.children.map(function(element){
      return instantiateReactComponent(element)
    })

    var subIndex = 0
    var tagContent = this._renderedComponents.map(function(component) {
      var nextID = rootID + '.' + subIndex++
      return component.mountComponent(nextID)
    }).join('')
  } else {
    var tagContent = ''
  }

  return tagOpen + tagContent + tagClose
}

ReactDOMComponent.prototype.receiveComponent = function(nextElement) {
  this._currentElement = nextElement

  var nextChildren = nextElement.props.children || []

  for(var i = 0; nextChildren.length > i; i++) {
    var childElement = nextChildren[i]
    var childComponent = this._renderedComponents[i]
    if (shouldUpdateReactComponent(childComponent._currentElement, childElement)) {
      childComponent.receiveComponent(childElement)
    }
  }
}

function shouldUpdateReactComponent(prevElement, nextElement) {
  if (prevElement != null && nextElement != null) {
    var prevType = typeof prevElement
    var nextType = typeof nextElement
    if (prevType == 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number'
    } else {
      return (
        nextType === 'object' &&
        prevElement.type === nextElement.type
      )
    }
    return false
  }
}

ReactDOMComponent.prototype.createMarkupForStyles = function(props) {
  if(props.className) {
    return ' class="' + props.className + '"'
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
  var Constructor = function(props, updater) {
    this.props = props
    this.state = this.getInitialState ? this.getInitialState() : null
    this.updater = updater

    var self = this

    this.setState = function(states) {
      for (name in states) {
        self.state[name] = states[name]
      }

      self.updater.receiveComponent(self.render())
    }
  }
  Constructor.prototype = spec

  return Constructor
}

// diagram in ReactBrowserEventEmitter
var ReactEventEmitter = {
  listenerBank: {},

  putListener: function putListener(id, registrationName, listener) {
    var bankForRegistrationName =
      this.listenerBank[registrationName] || (this.listenerBank[registrationName] = {})

    bankForRegistrationName[id] = listener
  },

  getListener: function getListener(id, registrationName) {
    return this.listenerBank[registrationName][id]
  },

  trapBubbledEvent: function trapBubbledEvent(topLevelEventType, element) {
    var eventMap = {
      'onClick': 'click'
    }
    var baseEventType = eventMap[topLevelEventType]
    element.addEventListener(baseEventType, this.dispatchEvent.bind(this, topLevelEventType))
  },

  dispatchEvent: function dispatchEvent(eventType, event) {
    event.preventDefault()
    var id = event.target.getAttribute('data-reactid')
    var listener = this.getListener(id, eventType)
    if(listener) {
      listener(event)
    }
  }
}

var instancesByReactRootID = {}
var containersByReactRootID = {};
function registerComponent(component, container) {
  var reactRootID = getRootIDString(container)
  instancesByReactRootID[reactRootID] = component
  containersByReactRootID[reactRootID] = container
  return reactRootID
}

var containerIndex = 0
function getRootIDString(container) {
  return '.' + containerIndex++
}

function getNode(targetID) {
  var sequenceID = targetID.split('.')
  sequenceID.shift()

  var child = containersByReactRootID[targetID.slice(0, 2)]
  while(child) {
    var id = child.getAttribute('data-reactid')
    if (id === targetID) {
      return child
    } else if(child.children){
      child = child.children[sequenceID.shift()]
    } else {
      child = null
    }
  }
}

function render(element, container) {

  var topComponent = instantiateReactComponent(element)

  var reactRootID = registerComponent(topComponent, container)

  ReactEventEmitter.trapBubbledEvent('onClick', container)

  container.innerHTML = topComponent.mountComponent(reactRootID)
}

var React = {
  createElement: createElement,
  DOM: DOM,
  createClass: createClass,
  render: render,
  getNode: getNode,

  // for testing purpose
  ReactDOMTextComponent: ReactDOMTextComponent,
  ReactDOMComponent: ReactDOMComponent,
  ReactCompositeComponent: ReactCompositeComponent,
  instantiateReactComponent: instantiateReactComponent,
  instancesByReactRootID: instancesByReactRootID,
  containersByReactRootID: containersByReactRootID,
  ReactEventEmitter: ReactEventEmitter,
  shouldUpdateReactComponent: shouldUpdateReactComponent,
}

if(typeof module !== 'undefined') {
  module.exports = React
}
