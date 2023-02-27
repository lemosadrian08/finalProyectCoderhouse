const express= require('express');
const cors = require('cors');
const session = require('express-session');
const logger = require('./src/utils/logger.utils');
const config = require('./src/config/env.config');
const passport= require('./src/middlewares/passport.middleware');
const errorMiddleware = require('./src/middlewares/error.middleware');
const apiRoutes = require('./src/routers/app.routers');
const main = require('./src/routers/web.routers')
const app = express();

//App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));
app.use(cors());


app.use(session({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 120000 
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  }));
  
  
  app.use(passport.initialize())
  app.use(passport.session())


//API routes
app.use('/', main)
app.use('/api', apiRoutes);

//Error middleware
app.use(errorMiddleware);

const server = app.listen(config.PORT, ()=>{
    logger.log('info', `Server is up and runningn on port ${config.PORT}`)
    logger.log('info', `Using ${config.DATA_SOURCE} as data source`)
});

server.on('error', (error) => {
    logger.log('error', `Error with the Server: ${error.message}`);
});
