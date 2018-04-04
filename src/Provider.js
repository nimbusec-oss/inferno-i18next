import { Component } from 'inferno';
import { throwError } from 'inferno-shared';

export default class Provider extends Component {

  /**
   * Create a new i18next provider instance.
   *
   * @param {object} props
   * @param {object} context
   * @throws {object} Error
   * @returns {void}
   */
  constructor(props, context) {
    super(props, context);
    if (!props.i18next) {
      throwError('an instance of i18next is required');
    }
  }

  /**
   * Return the context for child components.
   *
   * @returns {object}
   */
  getChildContext() {
    return {i18next: this.props.i18next};
  }

  /**
   * Handle the new props before it gets accepted.
   *
   * @param {object} nextProps
   * @throws {object} Error
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.i18next !== this.props.i18next) {
      throwError('changing of i18next instance is not supported');
    }
  }

  /**
   * Render the component.
   *
   * @returns {object}
   */
  render() {
    return this.props.children;
  }

}
