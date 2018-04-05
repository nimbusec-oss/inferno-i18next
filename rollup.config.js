import { dependencies } from './package.json';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';

export default {
	input: 'src/index.js',
	external: Object.keys(dependencies),
	globals: {
		'inferno': 'Inferno',
		'inferno-vnode-flags': 'VNodeFlags',
		'inferno-clone-vnode': 'cloneVNode',
		'inferno-create-element': 'createElement',
		'inferno-shared': 'infernoShared',
		'html-parse-stringify2': 'HTML'
	},
	plugins: [
		babel({
			babelrc: false,
			presets: [
				[
					'env',
					{
						'modules': false
					}
				]
			],
			exclude: 'node_modules/**',
			plugins: [
				'transform-class-properties',
				'transform-object-rest-spread',
				'inferno',
				'external-helpers'
			],
		}),
		isProduction && uglify(),
	],
	output: {
		file: 'dist/bundle' + (isProduction ? '.min.js' : '.js'),
		format: 'umd',
		name: 'infernoI18Next',
		sourcemap: isProduction,
	},
};
