'use strict';

const babelJest = require('babel-jest').default;
const tsPaths = require('../../tsconfig.paths.json').compilerOptions.paths;

const pathPairs = Object.entries(tsPaths).map(([ from, [ to ] ]) =>
  [from, to].map(path => path.replaceAll('/*', ''))
);

const alias = Object.fromEntries(pathPairs);

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

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
    ],
  ],
});
