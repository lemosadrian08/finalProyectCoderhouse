const express= require('express');
const cors = require('cors');
const session = require('express-session');
const logger = require('./src/utils/logger.utils');
const config = require('./src/config/env.config');
const passport= require('./src/middlewares/passport.middleware');
const errorMiddleware = require('./src/middlewares/error.middleware');
const apiRoutes = require('./src/routers/app.routers');
const main = require('./src/routers/web.routers')
const path = require('path')
const MongoStore = require('connect-mongo');
const app = express();
const { engine } = require ('express-handlebars')

//SocketServer
const { Server: HttpServer } = require('http');
const httpServer = new HttpServer(app);

const MessagesApi = require('./src/api/messages.api');
const api = new MessagesApi();
const { Server: SocketServer } = require('socket.io');
const io = new SocketServer(httpServer);

//views
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  layoutsDir: path.resolve(__dirname, './src/views/layouts'),
  partialsDir: path.resolve(__dirname, './src/views/partials')
}))
app.set('views', './src/views/layouts');
app.set('view engine', 'hbs');

//App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/views/layouts'));
app.use(cors());


app.use(session({
    secret: 'keyboard cat',
    cookie: {
      name: 'my-session',
      httpOnly: false,
      secure: false,
      maxAge: config.SESSION_TIME 
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_SESSION_STORE_URI
      }),
  }));
  
app.use(passport.initialize())
app.use(passport.session())

//API routes
app.use('/', main)
app.use('/api', apiRoutes);
 
//Error middleware
app.use(errorMiddleware);

//Listen
const server = httpServer.listen(config.PORT, ()=>{
    logger.log('info', `Server is up and runningn on port ${config.PORT}`)
    logger.log('info', `Using ${config.DATA_SOURCE} as data source`)
});
server.on('error', (error) => {
    logger.log('error', `Error with the Server: ${error.message}`);
});

// Socket Events

//Chat
io.on("connection",async (socket) => {

  logger.log('info', `There is a new client in the chat`)
  const messages = await api.getMessages()
  socket.emit("messages", messages);  

  socket.on("new-message",async (data) => {
    await api.createMessage(data)
    const updatedMessages = await api.getMessages()
    io.sockets.emit("messages", updatedMessages); 
  });
});


