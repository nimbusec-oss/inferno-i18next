inferno-i18next
===============

**inferno-i18next** is a translation utility for Inferno components using the [i18next](https://github.com/i18next/i18next) ecosystem.

## Features

- Super simple to use.
- Lightweight package.
- 100% pure, no inferno-compat.
- Renders in client-side and server-side.

## Installation

Via NPM:

```
$ npm install --save inferno-i18next
```

Via CDN: (use the `infernoI18Next` variable)

```html
<script src="https://unpkg.com/inferno-i18next/dist/bundle.min.js"></script>
```

## Overview

```js
import i18next from 'i18next';
import { render } from 'inferno';
import Component from 'inferno-component';
import { Provider, translate } from 'inferno-i18next';

@translate
class TranslatableComponent extends Component {

  /**
   * Render the component.
   *
   * @returns {object}
   */
  render() {
    const { t } = this.props;

    return (
      <div>
        <h1>{t('text')}</h1>
        <p>{t('anotherText')}</p>
      </div>
    );
  }

}

// Initialize the i18next package.
i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: {
        text: 'Hello World!',
        anotherText: 'This is an awesome i18n package.',
      },
    },
  },
});

// Mount the application into the DOM.
render(
  <Provider i18next={i18next}>
    <TranslatableComponent />
  </Provider>,
  document.getElementById('root')
);
```

## Resources

- [API Reference](https://bitbucket.org/midniteninja/inferno-i18next/src/master/API.md)
- [Release Notes](https://bitbucket.org/midniteninja/inferno-i18next/src/master/HISTORY.md)

## License

MIT © Midnite Ninja Innovations. See the [LICENSE](https://bitbucket.org/midniteninja/inferno-i18next/src/master/LICENSE) file for full license text.
