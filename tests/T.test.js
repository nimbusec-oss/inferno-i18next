import i18next, { resources } from './i18next';
import { render } from 'inferno';
import { createElement } from 'inferno-create-element';

import { Provider, T } from './../src';

describe('T', () => {
	const container = document.createElement('div');

	//    _____      _____  .___ _______
	//   /     \    /  _  \ |   |\      \
	//  /  \ /  \  /  /_\  \|   |/   |   \
	// /    Y    \/    |    \   /    |    \
	// \____|__  /\____|__  /___\____|__  /
	//         \/         \/            \/

	test('T instance', () => {
		expect((<T></T>).type).toBe(T);
	});

	test('single translation', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="foo">#</T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe(resources.en.translation.foo);
	});

	test('wrapped translation', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="bar">#<a href="asdf.com">#</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">bar</a>');
	});

	test('interpolation translation', () => {
		const count = 5
		const children = createElement(Provider, { i18next }, <T i18nKey="baz">#<a href="asdf.com">{{count}}</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">5</a>');
	});

	test('interpolation format translation', () => {
		const name = 'inferno'
		const children = createElement(Provider, { i18next }, <T i18nKey="quux">#<a href="asdf.com">{{name, format: 'uppercase'}}</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">INFERNO</a>');
	});

	test('empty element', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="qux">#<b />#</T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('qux<b></b>');
	});

	test('plural translation', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="qux" count={2}>#<b />#</T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('quxes<b></b>');
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

	test('wrong object declaration warning', () => {
		const count = 5
		const children = createElement(Provider, { i18next }, <T i18nKey="baz">#<a href="asdf.com">{count}</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">5</a>');
	});

	test('dual object declaration warning', () => {
		const count = 5
		const children = createElement(Provider, { i18next }, <T i18nKey="baz">#<a href="asdf.com">{{foo: 5, bar:3}}</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\"></a>');
	});
});
