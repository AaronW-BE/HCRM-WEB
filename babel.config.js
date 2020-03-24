let config =  {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {libraryName: "ant-design-vue", libraryDirectory: "es", style: true}
    ]
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push('transform-remove-console');
}
module.exports = config;