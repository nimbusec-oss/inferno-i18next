(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-shared'), require('inferno-create-element'), require('inferno-clone-vnode'), require('inferno-vnode-flags'), require('html-parse-stringify2')) :
  typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-shared', 'inferno-create-element', 'inferno-clone-vnode', 'inferno-vnode-flags', 'html-parse-stringify2'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.infernoI18Next = {}, global.Inferno, global.infernoShared, global.createElement, global.cloneVNode, global.VNodeFlags, global.HTML));
})(this, (function (exports, inferno, infernoShared, infernoCreateElement, infernoCloneVnode, infernoVnodeFlags, HTML) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var HTML__default = /*#__PURE__*/_interopDefaultLegacy(HTML);

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createSuper(t) {
    var r = _isNativeReflectConstruct();
    return function () {
      var e,
        o = _getPrototypeOf(t);
      if (r) {
        var s = _getPrototypeOf(this).constructor;
        e = Reflect.construct(o, arguments, s);
      } else e = o.apply(this, arguments);
      return _possibleConstructorReturn(this, e);
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperty(t, "prototype", {
      writable: !1
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o,
      r,
      i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var Provider = /*#__PURE__*/function (_Component) {
    _inherits(Provider, _Component);
    var _super = _createSuper(Provider);
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
      _this = _super.call(this, props, context);
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
    var Translate = /*#__PURE__*/function (_Component) {
      _inherits(Translate, _Component);
      var _super = _createSuper(Translate);
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
        _this = _super.call(this, props, context);
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
          return infernoCreateElement.createElement(TargetComponent, _objectSpread2(_objectSpread2({}, this.props), {}, {
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

  var _excluded = ["children", "count", "parent", "i18nKey", "i18next", "t"];
  function hasChildren(node) {
    return node && (node.children || node.props && node.props.children);
  }
  function getChildren(node) {
    return node && (node.children ? node.children : node.props && node.props.children);
  }
  function renderNodes(children, targetString, i18n, interpolation) {
    if (targetString === '') return [];

    // parse ast from string with additional wrapper tag
    // -> avoids issues in parser removing prepending text nodes
    var ast = HTML__default["default"].parse("<0>".concat(targetString, "</0>"));
    function mapAST(reactNodes, astNodes) {
      reactNodes = reactNodes ? Array.isArray(reactNodes) ? reactNodes : [reactNodes] : [];
      astNodes = astNodes ? Array.isArray(astNodes) ? astNodes : [astNodes] : [];
      var ne = astNodes.reduce(function (mem, node, i) {
        if (node.type === 'tag') {
          var child = reactNodes[parseInt(node.name, 10)] || reactNodes[0];
          isValidElement(child);
          if (hasChildren(child)) {
            var inner = mapAST(getChildren(child), node.children);
            mem.push(infernoCloneVnode.cloneVNode(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
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
    }

    // call mapAST with having react nodes nested into additional node like
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
  var T = /*#__PURE__*/function (_Component) {
    _inherits(T, _Component);
    var _super = _createSuper(T);
    function T() {
      _classCallCheck(this, T);
      return _super.apply(this, arguments);
    }
    _createClass(T, [{
      key: "render",
      value: function render() {
        var contextAndProps = _objectSpread2({
          i18next: this.context.i18next,
          t: this.context.i18next.getFixedT()
        }, this.props);
        var children = contextAndProps.children,
          count = contextAndProps.count,
          parent = contextAndProps.parent,
          i18nKey = contextAndProps.i18nKey,
          i18next = contextAndProps.i18next,
          tFromContextAndProps = contextAndProps.t,
          additionalProps = _objectWithoutProperties(contextAndProps, _excluded);
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
