/**
 * @jest-environment jsdom
 */

import i18next, { resources } from './i18next';
import { Provider, translate } from './../src';
import { render } from 'inferno';
import { createElement } from 'inferno-create-element';

describe('translate', () => {
  const container = document.createElement('div');

  function Foo(props) {
    return props.t('foo');
  }
  function Nico(props) {
    return props.t('nico');
  }

  //    _____      _____  .___ _______
  //   /     \    /  _  \ |   |\      \
  //  /  \ /  \  /  /_\  \|   |/   |   \
  // /    Y    \/    |    \   /    |    \
  // \____|__  /\____|__  /___\____|__  /
  //         \/         \/            \/

  it('should make the target component translatable', () => {
    const enhancedFoo = createElement(translate(Foo));
    const provider = createElement(Provider, {i18next}, enhancedFoo);
    render(provider, container);
    expect(container.innerHTML).toBe(resources.en.translation.foo);
  });

  it('should accept the namespace', () => {
    const enhancedNico = createElement(translate('nico')(Nico));
    const provider = createElement(Provider, {i18next}, enhancedNico);
    render(provider, container);
    expect(container.innerHTML).toBe(resources.en.nico.nico);
  });

  // _______________________________ ________ __________
  // \_   _____/\______   \______   \\_____  \\______   \
  //  |    __)_  |       _/|       _/ /   |   \|       _/
  //  |        \ |    |   \|    |   \/    |    \    |   \
  // /_______  / |____|_  /|____|_  /\_______  /____|_  /
  //         \/         \/        \/         \/       \/

  it('should be provided with an i18next instance', () => {
    expect(() => {
      const enhancedFoo = createElement(translate(Foo));
      render(enhancedFoo, container);
    }).toThrowError('an instance of i18next must be provided');
  });
});
