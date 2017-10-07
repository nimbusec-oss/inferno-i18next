import i18next, { resources } from './i18next';
import { Provider, translate } from './../src';
import { render } from 'inferno';
import createElement from 'inferno-create-element';

describe('translate', () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'root');

  function Foo(props) {
    return props.t('foo');
  }

  function Nico(props) {
    return props.t('nico');
  }

  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.appendChild(container);
  });

  it('should make the target component translatable', () => {
    const enhancedFoo = createElement(translate(Foo));
    const provider = createElement(Provider, {i18next}, enhancedFoo);
    render(provider, container);
    expect(container.innerHTML).toBe(resources.en.translation.foo);
  });
});
