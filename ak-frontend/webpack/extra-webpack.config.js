const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const projectDir = path.join(__dirname, '../../ak');

module.exports = async config => {
  console.log('Project working dir: ' + projectDir);
  const copyPlugin = new CopyWebpackPlugin([
    {
      from: projectDir + '/node_modules/swagger-ui/dist/css',
      to: 'swagger-ui/dist/css'
    },
    {
      from: projectDir + '/node_modules/swagger-ui/dist/lib',
      to: 'swagger-ui/dist/lib'
    },
    {
      from: projectDir + '/node_modules/swagger-ui/dist/swagger-ui.min.js',
      to: 'swagger-ui/dist/swagger-ui.min.js'
    },
    { from: projectDir + '/src/main/webapp/swagger-ui/', to: 'swagger-ui' },
    { from: projectDir + '/src/main/webapp/content/', to: 'content' },
    { from: projectDir + '/src/main/webapp/favicon.ico', to: 'favicon.ico' },
    {
      from: projectDir + '/src/main/webapp/manifest.webapp',
      to: 'manifest.webapp'
    }
  ]);
  config.plugins.push(copyPlugin);

  return config;
};
