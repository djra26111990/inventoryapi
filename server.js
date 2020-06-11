const express = require('express');
const cors = require('cors');           //Se importa express, cors y mongoose.
const mongoose = require('mongoose');

require('dotenv').config(); //Se importa dotenv para trabajar con variables 
                            //en la conexión y ocultar el URI.

//Se prepara configuraciones                            
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Se establece conexion con MongoDB en Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(" La conexión con la base de datos MongoDB se estableció satisfactoriamente");
})

//Se declaran las rutas
const productosRouter = require('./routes/productos');
const usersRouter = require('./routes/users');

app.use('/productos', productosRouter);
app.use('/users', usersRouter);

//Se abre la conexión del servidor
app.listen(port, () => {
    console.log(`Server está activo en el puerto: ${port}`);
});
