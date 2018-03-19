module.exports = {
  "plugins": [
    // "styled-components",
    "transform-runtime",
  ],
  presets: [
    // A Babel preset that can automatically determine the Babel plugins and polyfills
    // https://github.com/babel/babel-preset-env
    [
      'env'
    ],
    // Experimental ECMAScript proposals
    // https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
    'stage-0',
    // Flow
    // https://github.com/babel/babel/tree/master/packages/babel-preset-flow
    'flow',
    // JSX
    // https://github.com/babel/babel/tree/master/packages/babel-preset-react
    'react',
  ],
  "env": {
    "production": {
      "only": ["src"],
      "plugins": [
        "transform-react-remove-prop-types",
        "transform-react-constant-elements",
        "transform-react-inline-elements"
      ]
    },
    "test": {
      "plugins": ["transform-modules-commonjs", "dynamic-import-node"]
    }
  }
}
