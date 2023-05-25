require('dotenv').config();

const port = process.env.PORT;
const dbURL = process.env.MONGODB_CONNECTION;
const app = require('./app')
const mongoose = require('mongoose');


mongoose.connect(dbURL)
  .then(()=>{
      console.log(`\x1b[35m conexion db exitosa \x1b[37m`)
      //pongo en marcha el server
      app.listen(port, () => {
        console.log(` Servidor funcionando en puerto ${port} `)
          })
    })
    .catch((error)=>{
    console.log(error)
    })
