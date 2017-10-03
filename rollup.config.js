import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle' + (isProduction ? '.min.js' : '.js'),
    format: 'umd',
    name: 'infernoI18Next',
    sourcemap: isProduction,
  },
  amd: {
    id: 'inferno-i18next',
  },
  plugins: [
    babel({exclude: 'node_modules/**'}),
    commonjs(),
    nodeResolve({
      browser: true,
      jsnext: true,
    }),
    isProduction && uglify(),
  ],
};
