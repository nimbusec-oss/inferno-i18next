/**
 * @jest-environment jsdom
 */

import i18next, { resources } from './i18next';
import { render } from 'inferno';
import { createElement } from 'inferno-create-element';

import { Provider, T } from '../src';

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
		const children = createElement(Provider, { i18next }, <T i18nKey="bar"><a href="asdf.com">#</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">bar</a>');
	});

	test('interpolation translation', () => {
		const count = 5
		const children = createElement(Provider, { i18next }, <T i18nKey="baz" interpolation={{count}}><a href="asdf.com">#</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">5</a>');
	});

	test('interpolation format translation', () => {
		const name = 'inferno'
		const children = createElement(Provider, { i18next }, <T i18nKey="quux" interpolation={{name, format: 'uppercase'}}><a href="asdf.com">#</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('<a href=\"asdf.com\">INFERNO</a>');
	});

	test('empty element', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="qux" count={1}>#<b /></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('qux<b></b>');
	});

	test('plural translation', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="qux" count={2}>#<b /></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('quxes<b></b>');
	});

	test('wrapped, interpolated and single translation', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="userMessagesUnread" interpolation={{name: "bar", count:2}}>
			Hello <strong>foo</strong>, you have 3 unread message. <a href="/msgs">Go to messages</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('Hello <strong>bar</strong>, you have 2 unread messages. <a href=\"/msgs\">Go to messages</a>.');
	});

	test('wrapped, interpolated and plural translation', () => {
		const children = createElement(Provider, { i18next }, <T i18nKey="userMessagesUnread" count={2} interpolation={{name: "bar", count:5}}>
			Hello <strong>foo</strong>, you have 3 unread message. <a href="/msgs">Go to messages</a></T>);
		render(children, container);
		expect(container.children[0].innerHTML).toBe('Hello <strong>bar</strong>, you have 5 unread messages. <a href=\"/msgs\">Go to messages</a>.');
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
});
