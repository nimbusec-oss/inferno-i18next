(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-shared'), require('inferno-create-element'), require('inferno-clone-vnode'), require('inferno-vnode-flags'), require('html-parse-stringify2')) :
  typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-shared', 'inferno-create-element', 'inferno-clone-vnode', 'inferno-vnode-flags', 'html-parse-stringify2'], factory) :
  (global = global || self, factory(global.infernoI18Next = {}, global.Inferno, global.infernoShared, global.createElement, global.cloneVNode, global.VNodeFlags, global.HTML));
}(this, function (exports, inferno, infernoShared, infernoCreateElement, infernoCloneVnode, infernoVnodeFlags, HTML) { 'use strict';

  HTML = HTML && HTML.hasOwnProperty('default') ? HTML['default'] : HTML;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Provider, _Component);

    /**
     * Create a new i18next provider instance.
     *
     * @param {object} props
     * @param {object} context
     * @throws {object} Error
     * @returns {void}
     */
    function Provider(props, context) {
      var _this;

      _classCallCheck(this, Provider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Provider).call(this, props, context));

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


    _createClass(Provider, [{
      key: "getChildContext",
      value: function getChildContext() {
        return {
          i18next: this.props.i18next
        };
      }
      /**
       * Handle the new props before it gets accepted.
       *
       * @param {object} nextProps
       * @throws {object} Error
       * @returns {void}
       */

    }, {
      key: "componentWillReceiveProps",
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
      key: "render",
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
    var Translate =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Translate, _Component);

      /**
       * Create a new translate HOC instance.
       *
       * @param {object} props
       * @param {object} context
       * @throws {object} Error
       * @returns {void}
       */
      function Translate(props, context) {
        var _this;

        _classCallCheck(this, Translate);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Translate).call(this, props, context));

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


      _createClass(Translate, [{
        key: "getChildContext",
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
        key: "componentWillMount",
        value: function componentWillMount() {
          this.t = this.i18next.getFixedT(null, this.ns);
        }
        /**
         * Render the component.
         *
         * @returns {object}
         */

      }, {
        key: "render",
        value: function render() {
          return infernoCreateElement.createElement(TargetComponent, _objectSpread({}, this.props, {
            t: this.t,
            i18next: this.i18next
          }));
        }
      }]);

      return Translate;
    }(inferno.Component);

    Translate.displayName = 'Translate' + getDisplayName(TargetComponent);
    return Translate;
  } //  ____ ______________.___.____    .___________________.___.
  // |    |   \__    ___/|   |    |   |   \__    ___/\__  |   |
  // |    |   / |    |   |   |    |   |   | |    |    /   |   |
  // |    |  /  |    |   |   |    |___|   | |    |    \____   |
  // |______/   |____|   |___|_______ \___| |____|    / ______|
  //                                 \/               \/


  function getDisplayName(component) {
    return component.displayName || component.name || 'Component';
  } //  __      ____________    _____ _________________________________________
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

  function renderNodes(children, targetString, i18n, interpolation) {
    if (targetString === '') return []; // parse ast from string with additional wrapper tag
    // -> avoids issues in parser removing prepending text nodes

    var ast = HTML.parse("<0>".concat(targetString, "</0>"));

    function mapAST(reactNodes, astNodes) {
      reactNodes = reactNodes ? Array.isArray(reactNodes) ? reactNodes : [reactNodes] : [];
      astNodes = astNodes ? Array.isArray(astNodes) ? astNodes : [astNodes] : [];
      var ne = astNodes.reduce(function (mem, node, i) {
        if (node.type === 'tag') {
          var child = reactNodes[parseInt(node.name, 10)] || reactNodes[0];
          var isElement = isValidElement(child);

          if (hasChildren(child)) {
            var inner = mapAST(getChildren(child), node.children);
            mem.push(infernoCloneVnode.cloneVNode(child, _objectSpread({}, child.props, {
              key: i
            }), inner));
          } else {
            mem.push(child);
          }
        } else if (node.type === 'text') {
          var interpolated = i18n.services.interpolator.interpolate(node.content, interpolation, i18n.language);
          mem.push(interpolated);
        }

        return mem;
      }, []);
      return ne;
    } // call mapAST with having react nodes nested into additional node like
    // we did for the string ast from translation
    // return the children of that extra node to get expected result


    var result = mapAST([{
      dummy: true,
      children: children,
      flags: infernoVnodeFlags.VNodeFlags.HtmlElement,
      type: 'div'
    }], ast);
    return getChildren(result[0]);
  }

  function isValidElement(elem) {
    // is valid inferno vnode https://infernojs.org/docs/api/inferno
    return (elem.flags & (infernoVnodeFlags.VNodeFlags.Component | infernoVnodeFlags.VNodeFlags.Element)) > 0;
  }

  var T =
  /*#__PURE__*/
  function (_Component) {
    _inherits(T, _Component);

    function T() {
      _classCallCheck(this, T);

      return _possibleConstructorReturn(this, _getPrototypeOf(T).apply(this, arguments));
    }

    _createClass(T, [{
      key: "render",
      value: function render() {
        var contextAndProps = _objectSpread({
          i18next: this.context.i18next,
          t: this.context.i18next.getFixedT()
        }, this.props);

        var children = contextAndProps.children,
            count = contextAndProps.count,
            parent = contextAndProps.parent,
            i18nKey = contextAndProps.i18nKey,
            i18next = contextAndProps.i18next,
            tFromContextAndProps = contextAndProps.t,
            additionalProps = _objectWithoutProperties(contextAndProps, ["children", "count", "parent", "i18nKey", "i18next", "t"]);

        var t = tFromContextAndProps || i18next.t.bind(i18next);
        var useAsParent = parent !== undefined ? parent : 'div';
        var translation = i18nKey ? t(i18nKey, {
          interpolation: {
            prefix: '#$?',
            suffix: '?$#'
          },
          count: count
        }) : '';
        return infernoCreateElement.createElement(useAsParent, additionalProps, renderNodes(children, translation, i18next, contextAndProps.interpolation));
      }
    }]);

    return T;
  }(inferno.Component);

  exports.Provider = Provider;
  exports.T = T;
  exports.translate = wrap;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
