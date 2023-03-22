const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const logger = require('../utils/logger.utils')
const envConfig = require("../config/env.config")
const sendEmail = require("../utils/email.utils")

/* const sendEmail = require('../utils/email.utils') */
/* const envConfig = require('../utils/config.utils') */

const CartsApi = require('../api/carts.api');
const cartsApi = new CartsApi();
const UsersApi = require('../api/users.api');
const usersApi = new UsersApi();


// Bcrypt
const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);



// sign up
passport.use('signUp', new LocalStrategy(
  { passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      if(await usersApi.getUserByEmail(email)) return done(null,false)
      const cart = await cartsApi.createCart({})
      const newUser = {
        email,
        password: createHash(password),
        fullName: req.body.fullName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        image: req.file.filename,
        cart: cart._id.toString()
      };
      await usersApi.createUser(newUser)
      const userMongo = await usersApi.getUserByEmail(newUser.email)
    
    const mailPayload = {
      from: 'Node Server',
      to: envConfig.ADMIN_EMAIL,
      subject: "New Registration",
      html: `<h1>A new user has been registered</h1>
      <p>Email: ${newUser.email}</p>
      <p>Full Name: : ${newUser.fullName}</p>
      <p>Address: ${newUser.address}</p>
      <p>Phone Number: ${newUser.phoneNumber}</p>
      <p>Age: ${newUser.age}</p>
      <p>Image: ${newUser.image}</p>`
    }
    sendEmail(mailPayload)
    logger.log('info', 'User registration successfull')
    return done(null, userMongo);
  }
  catch(error) {
    logger.log('error', 'Error signing user up: ', error)
    return done(error);
  }
}));

// log in
passport.use('logIn', new LocalStrategy( 
  async (email, password, done) => {
  try {
    if(!await usersApi.getUserByEmail(email)) return done(null,false)
    const user = await usersApi.getUserByEmail(email);
    if (!isValidPassword(user, password)) {
      logger.log('info', 'Invalid user or password')
      return done(null, false);
    }
    return done(null, user);
  }
  catch(error) {
    logger.log('error', 'Error signing in... ', error);
    return done(error);
  }
}))

// Serialization
passport.serializeUser((user, done) => {
done(null, user._id);
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  const user = await usersApi.getUserById(id);
  done(null, user);
})


module.exports = passport;

