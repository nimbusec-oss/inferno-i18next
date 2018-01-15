import Inferno from 'inferno';
import Component from 'inferno-component';
import createElement from 'inferno-create-element';
import VNodeFlags from 'inferno-vnode-flags';
import HTML from 'html-parse-stringify2';

function hasChildren(node) {
  return node && (node.children || (node.props && node.props.children));
}

function getChildren(node) {
  return node && (node.children ? node.children : node.props && node.props.children);
}

function nodesToString(mem, children) {
	children = children ? (Array.isArray(children) ? children : [children]) : [];

	children.forEach((child, i) => {
    const elementKey = `${i}`;
    if (typeof child === 'string') {
      mem = `${mem}${child}`;
    } else if (hasChildren(child)) {
      mem = `${mem}<${elementKey}>${nodesToString('', getChildren(child), i + 1)}</${elementKey}>`;
    } else if (isValidElement(child)) {
      mem = `${mem}<${elementKey}></${elementKey}>`;
    } else if (typeof child === 'object') {
      const clone = { ...child };
			const format = clone.format;
      delete clone.format;

			const keys = Object.keys(clone);
      if (format && keys.length === 1) {
        mem = `${mem}<${elementKey}>{{${keys[0]}, ${format}}}</${elementKey}>`;
      } else if (keys.length === 1) {
        mem = `${mem}<${elementKey}>{{${keys[0]}}}</${elementKey}>`;
      } else if (console && console.warn) {
        // not a valid interpolation object (can only contain one value plus format)
        console.warn(`react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.`, child)
      }
    } else if (console && console.warn) {
      console.warn(`react-i18next: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.`, child)
    }
  });

  return mem;
}

function renderNodes(children, targetString, i18n) {
  if (targetString === '') return [];

  // parse ast from string with additional wrapper tag
  // -> avoids issues in parser removing prepending text nodes
  const ast = HTML.parse(`<0>${targetString}</0>`);

	function mapAST(reactNodes, astNodes) {
		reactNodes = reactNodes ? (Array.isArray(reactNodes) ? reactNodes : [reactNodes]) : [];
		astNodes = astNodes ? (Array.isArray(astNodes) ? astNodes : [astNodes]) : [];

    return astNodes.reduce((mem, node, i) => {
      if (node.type === 'tag') {
        const child = reactNodes[parseInt(node.name, 10)] || {};
        const isElement = isValidElement(child);

        if (typeof child === 'string') {
          mem.push(node.children[0].content); // original: mem.push(child)
        } else if (hasChildren(child)) {
					const inner = mapAST(getChildren(child), node.children);
          mem.push(Inferno.cloneVNode(
            child,
            { ...child.props, key: i },
            inner
          ));
        } else if (typeof child === 'object' && !isElement) {
          const interpolated = i18n.services.interpolator.interpolate(node.children[0].content, child, i18n.language);
          mem.push(interpolated);
        } else {
          mem.push(child);
        }
      } else if (node.type === 'text') {
				mem.push(node.content);
      }
      return mem;
		}, []);
  }

  // call mapAST with having react nodes nested into additional node like
  // we did for the string ast from translation
	// return the children of that extra node to get expected result
	const result = mapAST([{ dummy: true, children, flags: 4 }], ast);
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

    const defaultValue = nodesToString('', children);
    const translation = i18nKey ? t(i18nKey, { interpolation: { prefix: '#$?', suffix: '?$#' }, defaultValue, count }) : defaultValue;

		return createElement(
      useAsParent,
      additionalProps,
      renderNodes(children, translation, i18next)
    );
  }
}