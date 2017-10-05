import Component from 'inferno-component';
import { isArray, isString, throwError } from 'inferno-shared';

/**
 * Make the component translatable.
 *
 * @param {string|array|null} ns
 * @throws {object} Error
 * @returns {object}
 */
export default function translate(ns = null) {

  return (TargetComponent) => {

    if (!TargetComponent) {
      throwError('a valid component is required');
    }
    if (ns && (!isString(ns) || !isArray(ns))) {
      throwError('namespace must be a type of string, array or null');
    }

    class Translate extends Component {

      /**
       * I18Next instance.
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
       * @type {object}
       */
      t;

      /**
       * Create a new translate HOC instance.
       *
       * @param {any} props
       * @param {any} context
       * @throws {object} Error
       * @returns {void}
       */
      constructor(props, context) {
        super(props, context);
        if (!context.i18next) {
          throwError('an instance of i18next should be provided');
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
        return (
          <TargetComponent
            {...this.props}
            t={this.t}
            i18next={this.i18next}
          />
        );
      }

    }

    const name = TargetComponent.displayName ||
                 TargetComponent.name ||
                 'Component';

    Translate.displayName = 'Translate' + name;
    return Translate;

  };

}
