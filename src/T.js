import { Component } from 'inferno';
import { cloneVNode } from 'inferno-clone-vnode';
import { createElement } from 'inferno-create-element';
import { VNodeFlags } from 'inferno-vnode-flags';
import HTML from 'html-parse-stringify2';

function hasChildren(node) {
	return node && (node.children || (node.props && node.props.children));
}

function getChildren(node) {
	return node && (node.children ? node.children : node.props && node.props.children);
}

function renderNodes(children, targetString, i18n, interpolation) {
	if (targetString === '') return [];

	// parse ast from string with additional wrapper tag
	// -> avoids issues in parser removing prepending text nodes
	const ast = HTML.parse(`<0>${targetString}</0>`);

	function mapAST(reactNodes, astNodes) {
		reactNodes = reactNodes ? (Array.isArray(reactNodes) ? reactNodes : [reactNodes]) : [];
		astNodes = astNodes ? (Array.isArray(astNodes) ? astNodes : [astNodes]) : [];

		const ne = astNodes.reduce((mem, node, i) => {
			if (node.type === 'tag') {
				const child = reactNodes[parseInt(node.name, 10)] || reactNodes[0];
				const isElement = isValidElement(child);

				if (hasChildren(child)) {
					const inner = mapAST(getChildren(child), node.children);
					mem.push(cloneVNode(child, { ...child.props, key: i }, inner))
				} else {
					mem.push(child);
				}
			} else if (node.type === 'text') {
				const interpolated = i18n.services.interpolator.interpolate(node.content, interpolation, i18n.language);
				mem.push(interpolated);
			}
			return mem;
		}, []);
		return ne
	}

	// call mapAST with having react nodes nested into additional node like
	// we did for the string ast from translation
	// return the children of that extra node to get expected result
	const result = mapAST([{ dummy: true, children, flags: VNodeFlags.HtmlElement, type: 'div' }], ast);
	return getChildren(result[0]);
}

function isValidElement(elem) {
	// is valid inferno vnode https://infernojs.org/docs/api/inferno
	return (elem.flags & (VNodeFlags.Component | VNodeFlags.Element)) > 0;
}


export default class T extends Component {
	render() {
		const contextAndProps = { i18next: this.context.i18next, t: this.context.i18next.getFixedT(), ...this.props };
		const { children, count, parent, i18nKey, i18next, t: tFromContextAndProps, ...additionalProps } = contextAndProps;
		const t = tFromContextAndProps || i18next.t.bind(i18next);

		const useAsParent = parent !== undefined ? parent : 'div';

		const translation = i18nKey ? t(i18nKey, { interpolation: { prefix: '#$?', suffix: '?$#' }, count }) : '';

		return createElement(
			useAsParent,
			additionalProps,
			renderNodes(children, translation, i18next, contextAndProps.interpolation)
		);
	}
}
