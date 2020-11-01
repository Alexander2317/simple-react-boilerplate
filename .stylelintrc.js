module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'define-mixin',
        ],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'string-quotes': 'single',
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
      'rules',
    ],
    'order/properties-order': [],
  },
  ignoreFiles: [
    'package.json',
    'node_modules/**/*.*',
    'build/**/*.*',
    'flow-typed**/*.*',
    'coverage/**/*.*',
  ],
}
