import { dependencies } from './package.json';
import babel from 'rollup-plugin-babel'; 
import { uglify } from 'rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';

export default {
	input: 'src/index.js',
	external: Object.keys(dependencies),
	plugins: [
		babel(),
		isProduction && uglify(),
	],
	output: {
		file: 'dist/bundle' + (isProduction ? '.min.js' : '.js'),
		format: 'umd',
		name: 'infernoI18Next',
		sourcemap: isProduction,
		globals: {
			'inferno': 'Inferno',
			'inferno-vnode-flags': 'VNodeFlags',
			'inferno-clone-vnode': 'cloneVNode',
			'inferno-create-element': 'createElement',
			'inferno-shared': 'infernoShared',
			'html-parse-stringify2': 'HTML'
		},
	},
};
