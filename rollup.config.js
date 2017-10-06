import { peerDependencies } from './package.json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  external: Object.keys(peerDependencies),
  globals: {
    'i18next': 'i18next',
    'inferno': 'Inferno',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    commonjs({
      'namedExports': {
        'node_modules/inferno-shared/index.js': [
          'isArray',
          'isString',
          'throwError',
        ],
      },
    }),
    nodeResolve({
      browser: true,
      jsnext: true,
    }),
    isProduction && uglify(),
  ],
  output: {
    file: 'dist/bundle' + (isProduction ? '.min.js' : '.js'),
    format: 'umd',
    name: 'infernoI18Next',
    sourcemap: isProduction,
  },
  amd: {
    id: 'inferno-i18next',
  },
};
