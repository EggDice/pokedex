'use strict'

const babelJest = require('ts-jest').default
const tsPaths = require('../../tsconfig.paths.json').compilerOptions.paths

const pathPairs = Object.entries(tsPaths).map(([from, [to]]) =>
  [from, to].map(path => path.replaceAll('/*', '')),
)

const alias = Object.fromEntries(pathPairs)

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false
  }

  try {
    require.resolve('react/jsx-runtime')
    return true
  } catch (e) {
    return false
  }
})()

/**
 * Converts paths defined in tsconfig.json to the format of
 * moduleNameMapper in jest.config.js.
 *
 * For example, {'@alias/*': [ 'path/to/alias/*' ]}
 * Becomes {'@alias/(.*)': [ '<rootDir>/path/to/alias/$1' ]}
 *
 * @param {string} srcPath
 * @param {string} tsconfigPath
 */
function makeModuleNameMapper(srcPath, tsconfigPath) {
    // Get paths from tsconfig
    const {paths} = require(tsconfigPath).compilerOptions;

    const aliases = {};

    // Iterate over paths and convert them into moduleNameMapper format
    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '/(.*)');
        const path = paths[item][0].replace('/*', '/$1');
        aliases[key] = path;
    });
    return aliases;
}

const TS_CONFIG_PATH = '../../tsconfig.paths.json';
const SRC_PATH = '<rootDir>';


module.exports = babelJest.createTransformer({
  presets: [
    [
      require.resolve('babel-preset-react-app'),
      {
        runtime: hasJsxRuntime ? 'automatic' : 'classic',
      },
    ],
  ],
  babelrc: false,
  configFile: false,
  plugins: [
    [
      'module-resolver',
      {
        alias,
      },
      { "transform": "typescript-transform-paths" }
    ],
  ],
  moduleNameMapper: {
     '^@core/(.*)': '<rootDir>/src/core/$1',
    '^@/(.*)': '<rootDir>/src/$1'
  }
})
