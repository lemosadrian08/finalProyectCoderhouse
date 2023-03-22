const config = require('./src/config/env.config');

const serverInfo={
    MODE: config.MODE,
    SESSION_TIME: config.SESSION_TIME,
    PORT: config.MODE,
    NODE_ENV: config.NODE_ENV,
    HOST: config.HOST,
    MODE: config.MODE
}

const getServerInfo = ()=>{
    return serverInfo
}

module.exports= {getServerInfo}