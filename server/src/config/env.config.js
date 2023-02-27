const path = require('path');
const dotenv = require('dotenv');
const minimist = require ('minimist')
// NODE_ENV = "development" | "production"

dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV || 'development'}.env`)
});


const args = minimist(process.argv.slice(2),{
    alias:{
      p: 'port',
      m: 'mode'
    },
    default:{
      mode: 'FORK'
    }
  })


module.exports = {
    MODE: args.mode,
    PORT: args.port || process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    DATA_SOURCE: process.env.DATA_SOURCE || 'MEM' // 'MEM' | 'FILE' | 'MONGO'
};
