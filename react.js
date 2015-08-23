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

var React = {
  createElement: createElement,
  DOM: DOM
}
