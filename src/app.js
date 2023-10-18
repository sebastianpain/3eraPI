import express  from "express";
import __dirname from "./utils.js";
import nodemailer from 'nodemailer'
import viewRouter from './routes/views.router.js'
import coursesRouter from './routes/courses.router.js'
import usersRouter from './routes/users.router.js'
import sessionRouter from './routes/sessions.router.js'

import handlebars from 'express-handlebars'
import mongoose from "mongoose";

import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from 'cookie-parser';
import  config  from './config/config.js';




const app = express();

const PORT= config.mongo.PORT
mongoose.set('strictQuery',false) 
const connection = mongoose.connect(config.mongo.URL);
const transpor = nodemailer.createTransport({
    service:"gmail",
    port: 587,
    secure: true,
    auth:{
        user:"sebastianramirezpain@gmail.com",
        pass:"innyqnnxvzfkhtoa"
    },
    
    tls: {
        rejectUnauthorized: false
    }
    
});


app.get('/peticion2',(req,res)=>{
  req.logger.warn("Esto es una alerta");
  res.send("Estamos probando con Logger avanzado")
})

app.get('/mail',async(req,res)=>{
    try{
        const mailParams = {
            from: "sebastianramirezpain@gmail.com",
            to: "sebastianramirezpain@gmail.com",
            subject: "Restablecer contraseña",
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Reset Password</title>
            </head>
            <body>
                <h1>Reset Password</h1>
                
                    <button type="submit">Send Reset Email</button>
                
            </body>
            </html>
            
            `,
            
        };
        transpor.sendMail(mailParams, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Error al enviar el correo de recuperación de contraseña.' });
            } else {
              res.json({ message: 'Se ha enviado un enlace para restablecer la contraseña.' });
            }
          });
        
        const result = await transpor.sendMail(mailParams)
       
    } catch(error){
        console.log(error)
    }

})

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

initializePassport();
app.use(passport.initialize())
app.use(cookieParser());

app.use('/',viewRouter)
app.use('api/users/premium/:uid',usersRouter)
app.use('/api/courses',coursesRouter)
app.use('/api/users',usersRouter) 
app.use('/api/session',sessionRouter)


const server = app.listen(PORT,()=>console.log("Server Arriba"))





