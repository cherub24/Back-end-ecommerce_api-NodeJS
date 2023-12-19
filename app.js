const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv/config'); // Fixed require statement for dotenv

app.use((cors));
app.options('*', cors())

//routes
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

const api = process.env.API_URL;

//midleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);



//connecting mongodb using mongoose
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecom_web_api'
})
   .then(()=>{
    console.log('Database Connection is ready..')
   })
   .catch((err)=>{
    console.log(err);
   })



//server
const PORT = process.env.PORT || 3000; // Use the specified port from environment variables or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
