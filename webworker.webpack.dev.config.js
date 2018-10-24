const merge = require('webpack-merge');
const baseConfig = require('./webworker.webpack.config.js');

module.exports = merge(baseConfig, {
  'mode': 'development',
  'watch': true
});
