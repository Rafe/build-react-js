var ReactElement = function(type, props) {
  this.type = type
  this.props = props
}

var React = {
  createElement: function(type, config, children) {
    var props = {}
    for (propName in config) {
      props[propName] = config[propName]
    }
    props.children = children

    return new ReactElement(type, props)
  }
}
