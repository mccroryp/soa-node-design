var _ = require('lodash');

// deafult config object for our api
var config = {
  /* just placing the name of our possible NODE_ENV values for later*/
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  }
};

// check to see if the NODE_ENV was set, if not, the set it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;
// TODO
// envConfig is nothing right now, but it should be an object.
// depending on what ever config.env is, load up the appropriate file
// add assign the value to envConfig so the merge at the bottom actually works.
// What's happening here is that we have a base config in this file then we
// conditionally load in another config file depending on what
// env we are in. We then merge those objects with the env config overriting
// the default config if here. We then export that new object for our app to use
var envConfig;

try{
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
}catch(err){
  envConfig = {};
}

module.exports = _.merge(config, envConfig);
