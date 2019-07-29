import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'createNeko',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**']
      }),
      uglify()
    ]
  },
  /*{
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' }
    ]
  }*/
]
