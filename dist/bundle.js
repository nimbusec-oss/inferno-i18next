(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno-component'), require('inferno-shared'), require('inferno-create-element')) :
	typeof define === 'function' && define.amd ? define('inferno-i18next', ['exports', 'inferno-component', 'inferno-shared', 'inferno-create-element'], factory) :
	(factory((global.infernoI18Next = {}),global.Inferno.Component,global.Inferno.Shared,global.Inferno.createElement));
}(this, (function (exports,Component,infernoShared,createElement) { 'use strict';

Component = Component && Component.hasOwnProperty('default') ? Component['default'] : Component;
createElement = createElement && createElement.hasOwnProperty('default') ? createElement['default'] : createElement;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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
}(Component);

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
        return createElement(TargetComponent, _extends({}, this.props, {
          t: this.t,
          i18next: this.i18next
        }));
      }
    }]);
    return Translate;
  }(Component);

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

exports.Provider = Provider;
exports.translate = wrap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
