import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import Users from "./dao/dbManagers/users.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Products from "./dao/dbManagers/products.js";
import bodyParser from 'body-parser'
import ProductsRopository from "./repositories/ProductsRepository.js";

const app = express();
const PORT = config.mongo.PORT;

// Conexión a la base de datos MongoDB
mongoose.set('strictQuery', false);
const connection = mongoose.connect(config.mongo.URL);

// Configuración de Nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        user: "sebastianramirezpain@gmail.com",
        pass: "innyqnnxvzfkhtoa"
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Datos de usuarios (temporales)
const users = [
    { id: 1, email: 'sebastianramirezpain@gmail.com', password: '12345' }
];

// Ruta para enviar un correo electrónico de restablecimiento de contraseña
app.get('/mail', async (req, res) => {
    try {
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
                <p>Para restablecer su contraseña, haga clic en el siguiente enlace:</p>
                <a href="http://localhost:8080/generate-reset-token">Reset Password</a>
                </body>
                </html>
            `,
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailParams, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    message: 'Error al enviar el correo de recuperación de contraseña.'
                });
            } else {
                res.json({
                    message: 'Se ha enviado un enlace para restablecer la contraseña.'
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Generar un token de restablecimiento de contraseña
function generateResetToken() {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresIn = Date.now() + 3600000; // Expira en 1 hora
    return { token, expiresIn };
    
}

// Ruta para generar un token de restablecimiento y enviar un correo
app.get('/generate-reset-token', (req, res) => {
    const resetToken = generateResetToken();

    // Enviar un correo con el enlace de restablecimiento
    const mailParams = {
        from: 'sebastianramirezpain@gmail.com',
        to: 'sebastianramirezpain@gmail.com',
        subject: 'Reset Password',
        html: `
            <html>
            <head>
            <title>Reset Password</title>
            </head>
            <body>
            <h1>Reset Password</h1>
            <p>Click the following link to reset your password:</p>
            <a href="/reset-password/:token${resetToken}">Reset Password</a>
            </body>
            </html>
        `,
    };

    // Enviar el correo con el enlace de restablecimiento
    transporter.sendMail(mailParams, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending the password reset email.' });
        } else {
            // Enviar el token de restablecimiento en la respuesta
            res.json({ message: 'A password reset link has been sent to your email.', resetToken });
        }
    });
});

// Ruta para procesar la solicitud de restablecimiento de contraseña
app.post('/reset-password/:token', async (req, res) => {
    const token = req.params.token;
    const { newPassword, confirmPassword } = req.body;

    // Verificar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    try {
        // Verificar y decodificar el token
        jwt.verify(token, '12345', async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Token no válido o expirado' });
            }
            app.post('/reset-password-request', (req, res) => {

                const userEmail = req.body.email;
               
                // Verifica si el usuario existe en la base de datos
               
                const user = users.find(user => user.email === userEmail);
               
                if (!user) {
               
                 return res.status(404).json({ message: 'Usuario no encontrado' });
               
                }
               
                // Genera una solicitud de restablecimiento para el usuario
               
                // Esto podría incluir un registro de la solicitud en tu base de datos
               
                // O podrías simplemente enviar un correo electrónico al usuario con las instrucciones para restablecer la contraseña
               
                res.json({ message: 'Se ha enviado una solicitud de restablecimiento de contraseña por correo electrónico.' });
               
               });
            // Buscar el usuario por su ID en la base de datos
            const user = await Users.findOne({ _id: decoded.userId });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Hashear y actualizar la contraseña en la base de datos
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.json({ message: 'Contraseña restablecida con éxito' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
});
// Ruta para borrar un producto
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const user = req.user; // Obtener el usuario actual

    // Buscar el producto por su ID
    Products.findById(productId, (err, product) => {
        if (err) {
            // Manejar errores
        } else {
            if (user.role === 'admin' || product.owner === user.email) {
                // Usuario admin o dueño del producto
                // Pueden borrar el producto
                product.remove((err) => {
                    if (err) {
                        // Manejar errores
                    } else {
                        res.json({ message: 'Producto borrado con éxito' });
                    }
                });
            } else {
                res.status(403).json({ message: 'No tienes permisos para borrar este producto' });
            }
        }
    });
});

// Ruta para modificar un producto
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const user = req.user; // Obtener el usuario actual

    // Buscar el producto por su ID
    Products.findById(productId, (err, product) => {
        if (err) {
            // Manejar errores
        } else {
            if (user.role === 'admin' || product.owner === user.email) {
                // Usuario admin o dueño del producto
                // Pueden modificar el producto
                // Lógica de modificación aquí
                res.json({ message: 'Producto modificado con éxito' });
            } else {
                res.status(403).json({ message: 'No tienes permisos para modificar este producto' });
            }
        }
    });
    Products.findById(productId, (err, product) => {
        if (err) {
            // Manejar errores
        } else {
            if (user.role === 'admin' || product.owner === user.email) {
                // Usuario admin o dueño del producto
                // Pueden modificar el producto
                // Lógica de modificación aquí
                res.json({ message: 'Producto modificado con éxito' });
            } else {
                res.status(403).json({ message: 'No tienes permisos para modificar este producto' });
            }
        }
    });
});


// Otras rutas para manejar solicitudes de usuarios, sesiones, etc.
// ...

// Inicialización de Passport y configuración del servidor
initializePassport();
app.use(passport.initialize());
app.use(cookieParser());

// Escucha en el puerto especificado
const server = app.listen(PORT, () => console.log("Servidor en ejecución en el puerto " + PORT));
