import i18next from './i18next';
import { Provider } from '../src';
import { createElement } from 'inferno-create-element';

describe('Provider', () => {
  const children = createElement('div');
  const provider = new Provider({i18next, children});

  //    _____      _____  .___ _______
  //   /     \    /  _  \ |   |\      \
  //  /  \ /  \  /  /_\  \|   |/   |   \
  // /    Y    \/    |    \   /    |    \
  // \____|__  /\____|__  /___\____|__  /
  //         \/         \/            \/

  test('.getChildContext() should provide the i18next instance', () => {
    expect(provider.getChildContext().i18next).toBe(i18next);
  });

  test('.render() should return the children', () => {
    expect(provider.render()).toBe(children);
  });

  // _______________________________ ________ __________  _________
  // \_   _____/\______   \______   \\_____  \\______   \/   _____/
  //  |    __)_  |       _/|       _/ /   |   \|       _/\_____  \
  //  |        \ |    |   \|    |   \/    |    \    |   \/        \
  // /_______  / |____|_  /|____|_  /\_______  /____|_  /_______  /
  //         \/         \/        \/         \/       \/        \/

  test('.constructor() should require the i18next instance in props', () => {
    expect(() => {
      new Provider({});
    }).toThrowError('an instance of i18next is required');
  });

  test(
    '.componentWillReceiveProps() should not ' +
    'allow the changing of i18next instance',
    () => {
      expect(() => {
        const clonedI18Next = i18next.cloneInstance({lng: 'tl'});
        provider.componentWillReceiveProps({i18next: clonedI18Next});
      }).toThrowError('changing of i18next instance is not supported');
    }
  );
});
