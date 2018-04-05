(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-shared'), require('inferno-create-element'), require('inferno-clone-vnode'), require('inferno-vnode-flags'), require('html-parse-stringify2')) :
  typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-shared', 'inferno-create-element', 'inferno-clone-vnode', 'inferno-vnode-flags', 'html-parse-stringify2'], factory) :
  (factory((global.infernoI18Next = {}),global.Inferno,global.infernoShared,global.createElement,global.cloneVNode,global.VNodeFlags,global.HTML));
}(this, (function (exports,inferno,infernoShared,infernoCreateElement,infernoCloneVnode,infernoVnodeFlags,HTML) { 'use strict';

  HTML = HTML && HTML.hasOwnProperty('default') ? HTML['default'] : HTML;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Provider = function (_Component) {
    inherits(Provider, _Component);

    /**
     * Create a new i18next provider instance.
     *
     * @param {object} props
     * @param {object} context
     * @throws {object} Error
     * @returns {void}
     */
    function Provider(props, context) {
      classCallCheck(this, Provider);

      var _this = possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props, context));

      if (!props.i18next) {
        infernoShared.throwError('an instance of i18next is required');
      }
      return _this;
    }

    /**
     * Return the context for child components.
     *
     * @returns {object}
     */


    createClass(Provider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return { i18next: this.props.i18next };
      }

      /**
       * Handle the new props before it gets accepted.
       *
       * @param {object} nextProps
       * @throws {object} Error
       * @returns {void}
       */

    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.i18next !== this.props.i18next) {
          infernoShared.throwError('changing of i18next instance is not supported');
        }
      }

      /**
       * Render the component.
       *
       * @returns {object}
       */

    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);
    return Provider;
  }(inferno.Component);

  /**
   * Make the target component translatable.
   *
   * @param {object} TargetComponent
   * @param {string|array} ns
   * @returns {object}
   */
  function translate(TargetComponent, ns) {
    var Translate = function (_Component) {
      inherits(Translate, _Component);

      /**
       * Create a new translate HOC instance.
       *
       * @param {object} props
       * @param {object} context
       * @throws {object} Error
       * @returns {void}
       */


      /**
       * Namespace/s to be used.
       *
       * @type {string|array}
       */
      function Translate(props, context) {
        classCallCheck(this, Translate);

        var _this = possibleConstructorReturn(this, (Translate.__proto__ || Object.getPrototypeOf(Translate)).call(this, props, context));

        if (!context.i18next) {
          infernoShared.throwError('an instance of i18next must be provided');
        }
        _this.i18next = context.i18next;
        _this.ns = ns || _this.i18next.options.defaultNS;
        return _this;
      }

      /**
       * Return the context for child components.
       *
       * @returns {object}
       */


      /**
       * Fixed i18next translate function.
       *
       * @type {function}
       */


      /**
       * Provided i18next instance.
       *
       * @type {object}
       */


      createClass(Translate, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return {
            t: this.t,
            i18next: this.i18next
          };
        }

        /**
         * Handle the component before it gets mounted to the DOM.
         *
         * @returns {void}
         */

      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.t = this.i18next.getFixedT(null, this.ns);
        }

        /**
         * Render the component.
         *
         * @returns {object}
         */

      }, {
        key: 'render',
        value: function render() {
          return infernoCreateElement.createElement(TargetComponent, _extends({}, this.props, {
            t: this.t,
            i18next: this.i18next
          }));
        }
      }]);
      return Translate;
    }(inferno.Component);

    Translate.displayName = 'Translate' + getDisplayName(TargetComponent);
    return Translate;
  }

  //  ____ ______________.___.____    .___________________.___.
  // |    |   \__    ___/|   |    |   |   \__    ___/\__  |   |
  // |    |   / |    |   |   |    |   |   | |    |    /   |   |
  // |    |  /  |    |   |   |    |___|   | |    |    \____   |
  // |______/   |____|   |___|_______ \___| |____|    / ______|
  //                                 \/               \/

  function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
  }

  //  __      ____________    _____ _________________________________________
  // /  \    /  \______   \  /  _  \\______   \______   \_   _____/\______   \
  // \   \/\/   /|       _/ /  /_\  \|     ___/|     ___/|    __)_  |       _/
  //  \        / |    |   \/    |    \    |    |    |    |        \ |    |   \
  //   \__/\  /  |____|_  /\____|__  /____|    |____|   /_______  / |____|_  /
  //        \/          \/         \/                           \/         \/

  function wrap(arg) {
    if (infernoShared.isString(arg) || infernoShared.isArray(arg)) {
      return function (component) {
        return translate(component, arg);
      };
    }
    return translate(arg);
  }

  function hasChildren(node) {
    return node && (node.children || node.props && node.props.children);
  }

  function getChildren(node) {
    return node && (node.children ? node.children : node.props && node.props.children);
  }

  function nodesToString(mem, children) {
    children = children ? Array.isArray(children) ? children : [children] : [];

    children.forEach(function (child, i) {
      var elementKey = '' + i;
      if (typeof child === 'string') {
        mem = '' + mem + child;
      } else if (hasChildren(child)) {
        mem = mem + '<' + elementKey + '>' + nodesToString('', getChildren(child), i + 1) + '</' + elementKey + '>';
      } else if (isValidElement(child)) {
        mem = mem + '<' + elementKey + '></' + elementKey + '>';
      } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object') {
        var clone = _extends({}, child);
        var format = clone.format;
        delete clone.format;

        var keys = Object.keys(clone);
        if (format && keys.length === 1) {
          mem = mem + '<' + elementKey + '>{{' + keys[0] + ', ' + format + '}}</' + elementKey + '>';
        } else if (keys.length === 1) {
          mem = mem + '<' + elementKey + '>{{' + keys[0] + '}}</' + elementKey + '>';
        } else if (console && console.warn) {
          // not a valid interpolation object (can only contain one value plus format)
          console.warn('react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.', child);
        }
      } else if (console && console.warn) {
        console.warn('react-i18next: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.', child);
      }
    });

    return mem;
  }

  function renderNodes(children, targetString, i18n) {
    if (targetString === '') return [];

    // parse ast from string with additional wrapper tag
    // -> avoids issues in parser removing prepending text nodes
    var ast = HTML.parse('<0>' + targetString + '</0>');

    function mapAST(reactNodes, astNodes) {
      reactNodes = reactNodes ? Array.isArray(reactNodes) ? reactNodes : [reactNodes] : [];
      astNodes = astNodes ? Array.isArray(astNodes) ? astNodes : [astNodes] : [];

      return astNodes.reduce(function (mem, node, i) {
        if (node.type === 'tag') {
          var child = reactNodes[parseInt(node.name, 10)] || {};
          var isElement = isValidElement(child);

          if (typeof child === 'string') {
            mem.push(node.children[0].content); // original: mem.push(child)
          } else if (hasChildren(child)) {
            var inner = mapAST(getChildren(child), node.children);
            mem.push(infernoCloneVnode.cloneVNode(child, _extends({}, child.props, { key: i }), inner));
          } else if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) === 'object' && !isElement) {
            var interpolated = i18n.services.interpolator.interpolate(node.children[0].content, child, i18n.language);
            mem.push(interpolated);
          } else {
            mem.push(child);
          }
        } else if (node.type === 'text') {
          mem.push(node.content);
        }
        return mem;
      }, []);
    }

    // call mapAST with having react nodes nested into additional node like
    // we did for the string ast from translation
    // return the children of that extra node to get expected result
    var result = mapAST([{ dummy: true, children: children, flags: infernoVnodeFlags.VNodeFlags.HtmlElement, type: 'div' }], ast);
    return getChildren(result[0]);
  }

  function isValidElement(elem) {
    // is valid inferno vnode https://infernojs.org/docs/api/inferno
    return (elem.flags & (infernoVnodeFlags.VNodeFlags.Component | infernoVnodeFlags.VNodeFlags.Element)) > 0;
  }

  var T = function (_Component) {
    inherits(T, _Component);

    function T() {
      classCallCheck(this, T);
      return possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).apply(this, arguments));
    }

    createClass(T, [{
      key: 'render',
      value: function render() {
        var contextAndProps = _extends({ i18next: this.context.i18next, t: this.context.i18next.getFixedT() }, this.props);
        var children = contextAndProps.children,
            count = contextAndProps.count,
            parent = contextAndProps.parent,
            i18nKey = contextAndProps.i18nKey,
            i18next = contextAndProps.i18next,
            tFromContextAndProps = contextAndProps.t,
            additionalProps = objectWithoutProperties(contextAndProps, ['children', 'count', 'parent', 'i18nKey', 'i18next', 't']);

        var t = tFromContextAndProps || i18next.t.bind(i18next);

        var useAsParent = parent !== undefined ? parent : 'div';

        var defaultValue = nodesToString('', children);
        var translation = i18nKey ? t(i18nKey, { interpolation: { prefix: '#$?', suffix: '?$#' }, defaultValue: defaultValue, count: count }) : defaultValue;

        return infernoCreateElement.createElement(useAsParent, additionalProps, renderNodes(children, translation, i18next));
      }
    }]);
    return T;
  }(inferno.Component);

  exports.Provider = Provider;
  exports.translate = wrap;
  exports.T = T;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
