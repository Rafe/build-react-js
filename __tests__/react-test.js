jest.dontMock('../react')

var React = require('../react')

// step 1: let's create element!

describe('React.createElement', function() {
  it('creates ReactElement with type, prps and children', function() {
    var element = React.createElement('div', { className: 'button'}, [
      'test'
    ])
    expect(element.type).toEqual('div')
    expect(element.props.className).toEqual('button')
    expect(element.props.children[0]).toEqual('test')
  })
})

// step 2: let's create DOM!

// describe('React.DOM', function() {
  // it('creates dom elements', function() {
    // ['div', 'h1', 'p', 'a'].forEach(function(type) {
      // var element = React.DOM[type](null, null)
      // expect(element.type).toEqual(type)
    // })
  // })

  // it('creates nested dom tree', function() {
    // var tree = React.DOM.div(null, [
      // React.DOM.div(null, [
        // React.DOM.p(null, ['test']),
        // React.DOM.a(null, ['link']),
      // ])
    // ])

    // expect(tree.type).toEqual('div')
    // expect(tree.props.children.length).toEqual(1)

    // var child = tree.props.children[0]

    // expect(child.type).toEqual('div')
    // expect(child.props.children.length).toEqual(2)

    // child = child.props.children[0]

    // expect(child.type).toEqual('p')

    // child = child.props.children[0]

    // expect(child).toEqual('test')
  // })
// })

// // step 3: let's create Components!

// describe('ReactDOMTextComponent', function() {
  // it('creates component with element', function() {
    // var component = new React.ReactDOMTextComponent('test')
    // expect(component._currentElement).toEqual('test')
  // })
// })

// describe('ReactDOMComponent', function() {
  // it('creates component with element', function() {
    // var element = React.DOM.div(null, null)
    // var component = new React.ReactDOMComponent(element)
    // expect(component._currentElement).toEqual(element)
  // })
// })

// describe('ReactCompositeComponent', function() {
  // it('creates component with custom element', function() {
    // var element = function() {}
    // var component = new React.ReactCompositeComponent(element)
    // expect(component._currentElement).toEqual(element)
  // })
// })

// describe('instantiateReactComponent', function() {
  // it('instantiate component with different element types', function() {
    // var component

    // component = React.instantiateReactComponent('test')
    // expect(component.constructor).toEqual(React.ReactDOMTextComponent)

    // component = React.instantiateReactComponent(React.DOM.div(null, null))
    // expect(component.constructor).toEqual(React.ReactDOMComponent)

    // component = React.instantiateReactComponent(
      // React.createElement(function() {}, null, null)
    // )
    // expect(component.constructor).toEqual(React.ReactCompositeComponent)
  // })
// })

// // step 4: let's create class!

// describe('React.createClass', function() {
  // it("creates a public component with state", function() {
    // var Component = React.createClass({
      // render: function() {
        // return React.DOM.div(null, null)
      // },
      // getInitialState: function() {
        // return { baz: 'qaz'}
      // }
    // })

    // var component = new Component({foo: 'bar'})
    // expect(component.render().type).toEqual('div')
    // expect(component.props.foo).toEqual('bar')
    // expect(component.state.baz).toEqual('qaz')
  // });
// })

// // step 5: let's mount Components!

// describe('ReactTextComponent.mountComponent', function() {
  // it('creates markups with element', function() {
    // var component = React.instantiateReactComponent('test')
    // var markup = component.mountComponent('.0.1')
    // expect(component._rootID).toEqual('.0.1')
    // expect(markup).toEqual('<span data-reactid=".0.1">test</span>')
  // })
// })

// describe('ReactDOMComponent', function() {
  // it('creates component with element', function() {
    // var element = React.DOM.div(null, null)
    // var component = React.instantiateReactComponent(element)

    // var markup = component.mountComponent('.0.1')

    // expect(component._rootID).toEqual('.0.1')
    // expect(markup).toEqual('<div data-reactid=".0.1"></div>')
  // })

  // it('creates component with class name', function() {
    // var element = React.DOM.div({ className: 'button' }, null)
    // var component = React.instantiateReactComponent(element)

    // var markup = component.mountComponent('.0.1')

    // expect(component._rootID).toEqual('.0.1')
    // expect(markup).toEqual('<div class="button" data-reactid=".0.1"></div>')
  // })

  // it('creates component tree', function() {
    // var div = React.DOM.div
    // var p = React.DOM.p

    // var element = div(null, [
      // div(null, [
        // p(null, null),
        // div(null, null)
      // ])
    // ])

    // var component = React.instantiateReactComponent(element)

    // var markup = component.mountComponent('.0')
    // var content = '<div data-reactid=".0">' +
                    // '<div data-reactid=".0.0">' +
                      // '<p data-reactid=".0.0.0"></p>' +
                      // '<div data-reactid=".0.0.1"></div>' +
                    // '</div>' +
                  // '</div>'
    // expect(markup).toEqual(content)
  // })
// })

// describe('ReactCompositeComponent.mountComponent', function() {
  // it('creates rendered components with custom component instance', function() {
    // var div = React.DOM.div
    // var App = React.createClass({
      // render: function() {
        // return div(null, [
          // 'test'
        // ])
      // }
    // })

    // var element = React.createElement(App, { className: 'bar' }, null)
    // var component = React.instantiateReactComponent(element)

    // var markup = component.mountComponent('.0')

    // expect(component._rootID).toEqual('.0')
    // expect(markup).toEqual('<div data-reactid=".0">' +
                             // '<span data-reactid=".0.0">test</span>' +
                           // '</div>')
  // })
// })

// // step 6: let's render!

// describe('React.render', function() {
  // it('set rendered markup files to container', function() {
    // var div = React.DOM.div
    // var App = React.createClass({
      // render: function() {
        // return div(null, [
          // 'test'
        // ])
      // }
    // })

    // var container = {
      // addEventListener: function() {}
    // }

    // var element = React.createElement(App, { className: 'bar' }, null)

    // React.render(element, container)

    // expect(container.innerHTML).toEqual(
      // '<div data-reactid=".0">' +
        // '<span data-reactid=".0.0">test</span>' +
      // '</div>'
    // )
    // expect(React.instancesByReactRootID['.0']._currentElement).toEqual(element)
  // })
// })

// // step 7: let's getNode by ReactID!

// describe('React.getNode', function() {
  // it('can find the node by react id', function() {
    // var container = {
      // getAttribute: function() {},
      // children: [{
        // getAttribute: function(attribute) {
          // return '.0'
        // },
        // children: [{
            // getAttribute: function(attribute) {
              // return '.0.0'
            // },
          // }, {
            // isTarget: true,
            // getAttribute: function(attribute) {
              // return '.0.1'
          // },
        // }]
      // }]
    // }

    // React.containersByReactRootID['.0'] = container

    // var node = React.getNode('.0.1')

    // expect(node.isTarget).toEqual(true)
  // })
// })

// // step 8: let's capture event!

/* Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

// describe('React.ReactEventEmitter', function() {
  // it('register listeners', function() {
    // React.ReactEventEmitter.putListener('0.1.1', 'onClick', 'listener')
    // expect(React.ReactEventEmitter.getListener('0.1.1', 'onClick')).toEqual('listener')
  // })

  // describe('trapBubbledEvent', function() {
    // it('capture event on top level', function() {
      // var listener = jasmine.createSpy('listner')

      // React.ReactEventEmitter.putListener('0.1.1', 'onClick', listener)

      // var element = {
        // addEventListener: function(type, dispatcher) {
          // var event = {
            // preventDefault: jest.genMockFunction(),
            // target: {
              // getAttribute: function() {
                // return '0.1.1'
              // }
            // }
          // }
          // dispatcher(event)
        // }
      // }
      // spyOn(element, 'addEventListener').andCallThrough()

      // React.ReactEventEmitter.trapBubbledEvent('onClick', element)

      // expect(element.addEventListener).toHaveBeenCalledWith('click', jasmine.any)
      // expect(listener).toHaveBeenCalled()
    // })
  // })
// })

// // step 9: let's update!

// describe('React.ReactDOMTextComponent.receiveComponent', function() {
  // it('updates inner text', function() {
    // var component = React.instantiateReactComponent('text')
    // var node = { innerHTML: 'text' }

    // spyOn(React, 'getNode').andReturn(node)

    // component.mountComponent('0.0.1')
    // component.receiveComponent('foobar')
    // expect(React.getNode).toHaveBeenCalledWith('0.0.1')
    // expect(node.innerHTML).toEqual('foobar')
  // })
// })

// describe('React.ReactCompositeComponent.receiveComponent', function() {
  // var App = React.createClass({
    // render: function() {
      // return React.DOM.div(null, null)
    // }
  // })

  // var component = React.instantiateReactComponent(React.createElement(App, null, null))
  // component._renderedComponent = jasmine.createSpyObj('component', ['receiveComponent'])
  // component.receiveComponent(React.DOM.div(null, ['test']))
  // expect(component._renderedComponent.receiveComponent).toHaveBeenCalled()
// })

// describe('React.ReactDOMComponent.receiveComponent', function() {
  // it('update the dom element and subtree', function() {
    // var tree = React.DOM.div(null, [
      // React.DOM.div(null, null),
      // React.DOM.div(null, null),
    // ])

    // var component = React.instantiateReactComponent(tree)
    // var mockComponent1 = jasmine.createSpyObj('component', ['receiveComponent'])
    // var mockComponent2 = jasmine.createSpyObj('component', ['receiveComponent'])
    // component._renderedComponents = [ mockComponent1, mockComponent2 ]
    // component.receiveComponent(tree)
    // expect(mockComponent1.receiveComponent).toHaveBeenCalled()
    // expect(mockComponent2.receiveComponent).toHaveBeenCalled()
  // })
// })

// extra:
// step 10: let's lifecycle!
// step 11: let's make updateQueue!
