const express= require('express');
const cors = require('cors');
const config =requre('./src/');

const app = express();

//App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

