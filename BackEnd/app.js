// app.js works as the main file of the backend, 
// it is responsible for connecting to the database and starting the server

// import the necessary modules
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// create an express application
const app = express();
app.use(express.json());

// bd connection
connectDB();

//server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//--------------------------------------------------------------------

//routes
//home (test)
app.get('/', (req, res) => {
    res.send('aaaaaaaaaaa >:v');
  });


//users test
const Usuario = require('./models/Usuario');

//users route test
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    const nuevoUsuario = new Usuario({ nombre, correo });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(400).json({ error: 'Error al agregar el usuario' });
  }
});


