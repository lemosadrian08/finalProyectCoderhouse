const nodemailer = require('nodemailer') 
const envConfig = require('../config/env.config') 
const logger = require('./logger.utils')


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: envConfig.ADMIN_EMAIL,
        pass: envConfig.ADMIN_EMAIL_PASSWORD
    }
});

const sendEmail = async (mailPayload) => {
    try{
        await transporter.sendMail(mailPayload)
    }catch(error){
        logger.log('error', 'Error: ', error);
    }
}





module.exports = sendEmail