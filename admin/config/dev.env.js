'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
   BASE_API: '"http://39.106.96.105:8073/hups"',
  //  BASE_API: '"http://c29838e767.qicp.vip/hups"'
  //  BASE_API: '"http://192.168.3.111:8092/hups"',
  //  BASE_API: '"http://127.0.0.1:8092/hups"',
  //  SINGLE_SIGN_URL: '"http://127.0.0.1:9528//#/singleSign"' // dev
   SINGLE_SIGN_URL: '"http://39.106.96.105:8076/#/singleSign"' // prod
  //  BASE_API:'"http://192.168.3.106:8092/hups"'
})
