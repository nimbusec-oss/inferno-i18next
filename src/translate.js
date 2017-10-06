import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import { isArray, isString, throwError } from 'inferno-shared';

/**
 * Make the target component translatable.
 *
 * @param {object} TargetComponent
 * @param {string|array} ns
 */
function translate(TargetComponent, ns) {
  class Translate extends Component {

    /**
     * Provided i18next instance.
     *
     * @type {object}
     */
    i18next;

    /**
     * Namespace/s to be used.
     *
     * @type {string|array}
     */
    ns;

    /**
     * Fixed i18next translate function.
     *
     * @type {function}
     */
    t;

    /**
     * Create a new translate HOC instance.
     *
     * @param {object} props
     * @param {object} context
     * @throws {object} Error
     * @returns {void}
     */
    constructor(props, context) {
      super(props, context);
      if (!context.i18next) {
        throwError('an instance of i18next must be provided');
      }
      this.i18next = context.i18next;
      this.ns = ns || this.i18next.options.defaultNS;
    }

    /**
     * Return the context for child components.
     *
     * @returns {object}
     */
    getChildContext() {
      return {
        t: this.t,
        i18next: this.i18next,
      };
    }

    /**
     * Handle the component before it gets mounted to the DOM.
     *
     * @returns {void}
     */
    componentWillMount() {
      this.t = this.i18next.getFixedT(null, this.ns);
    }

    /**
     * Render the component.
     *
     * @returns {object}
     */
    render() {
      return createElement(TargetComponent, {
        ...this.props,
        t: this.t,
        i18next: this.i18next,
      });
    }

  }

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

export default function wrap(arg) {
  if (isString(arg) || isArray(arg)) {
    return TargetComponent => translate(TargetComponent, arg);
  }
  return translate(arg);
}
