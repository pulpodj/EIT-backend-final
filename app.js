const express = require('express');
const app = express();
const productRouter = require ("./routes/product.routes")
const userRouter = require ("./routes/user.routes")
const orderRouter = require ("./routes/order.routes")
const categoryRouter = require ("./routes/category.routes")
const uploadRouter = require ("./routes/upload.routes")
const viewsRoutes = require("./routes/views.routes")
const cors = require('cors')

//Cargar configuracion de plantillas de Javascript
app.set('view engine', 'ejs');
app.use(express.static("public"));
//middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

 //Definir rutas a usar por mi app express
 app.use(productRouter) 
 app.use(userRouter)
 app.use(orderRouter)
 app.use(categoryRouter)
 app.use(uploadRouter)
 app.use(viewsRoutes)

  module.exports = app