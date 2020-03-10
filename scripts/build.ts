import {belongsTo, report} from "rogo";
import * as rollup from "rollup";
import * as path from "path";
const babel = require('rollup-plugin-babel');
const node = require("@rollup/plugin-node-resolve");
const cjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
import { terser } from "rollup-plugin-terser"; // to minify bundle
const typescript = require("rollup-plugin-typescript2");
const postcss = require('rollup-plugin-postcss')
const pkg = require("../package.json")

// quick config
const input = 'src/lib-entry.ts'
const outDir = 'dist'
const outputName = 'react-colrow' // the built file name is outDir/outputName.format.js
const moduleName = 'reactColrow' // for umd, amd

const getBabelConfig = () => ({
  // .babelrc
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: false,
    }],
    '@babel/typescript', '@babel/react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    // Stage 1
    ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
    // Stage 2
    '@babel/plugin-proposal-export-namespace-from',
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    '@babel/plugin-proposal-json-strings',
  ],
  // for rollup babel plugin
  runtimeHelpers: true,
  exclude: [/@babel\/runtime/, /@babel\\runtime/, /regenerator-runtime/],
  extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue', '.ts', '.tsx'],
  babelrc: false,
})

const esmBabelConfig = <any>getBabelConfig()
esmBabelConfig.presets[0][1]['targets'] = {esmodules: true}

const cjsBabelConfig = <any>getBabelConfig()
cjsBabelConfig.plugins.push(['module-extension', {mjs: 'js'}]) // replace .mjs to .js

const umdBabelConfig = <any>getBabelConfig()

export default <rollup.RollupOptions[]>[
  // esm
  {
    input,
    external: (source) => belongsTo(source, Object.keys(pkg.dependencies||{})) || belongsTo(source, Object.keys(pkg.peerdependencies||{})),
    plugins: [
      postcss(),
      node(), cjs(), json(),  typescript(),
      babel(esmBabelConfig),
    ],
    output: {
      dir: `${outDir}/esm`,
      format: 'esm',
      banner: getBanner(pkg),
      sourcemap: false,
    },
  },
  // cjs
  {
    input,
    external: (source) => belongsTo(source, Object.keys(pkg.dependencies||{})) || belongsTo(source, Object.keys(pkg.peerdependencies||{})),
    plugins: [
      postcss(),
      node(), cjs(), json(), typescript(),
      babel(cjsBabelConfig),
    ],
    output: {
      dir: `${outDir}/cjs`,
      format: 'cjs',
      banner: getBanner(pkg),
      sourcemap: false,
    },
  },
  // // umd
  // {
  //   input,
  //   external: (source) => belongsTo(source, Object.keys(pkg.peerdependencies||{})),
  //   plugins: [
  //     node(), cjs(), json(), typescript(),
  //     babel(umdBabelConfig),
  //   ],
  //   output: {
  //     dir: `${outDir}/umd`,
  //     format: 'umd',
  //     banner: getBanner(pkg),
  //     sourcemap: false,
  //     name: moduleName,
  //   },
  // },
  // umd min
  {
    input,
      external: (source) => belongsTo(source, Object.keys(pkg.peerdependencies||{})),
    plugins: [
      postcss(),
      node(), cjs(), json(), typescript(),
      terser(), // to minify bundle
      babel(umdBabelConfig),
    ],
    output: {
      dir: `${outDir}/umd-min`,
      format: 'umd',
      banner: getBanner(pkg),
      sourcemap: false,
      name: moduleName,
    },
  },
]

if (process.argv.includes('--report')) {
  report(outDir)
}

function getBanner(pkg) {
  return `
/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author}
 * Released under the ${pkg.license} License.
 */`.trim()
}