module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-flow',
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-classes',
      ['@babel/plugin-transform-runtime', { regenerator: true }],
      ['module-resolver', { root: ['./'] }],
    ],
    ignore: ['node_modules', 'dist'],
  }
}
