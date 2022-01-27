const express = require('express');
const bodyParser = require('body-parser');

//db connection
const sequelize = require('./utils/database');

//routes
const homeroutes = require('./routes/homeroutes');
const adminroutes = require('./routes/adminroutes');

//models
const User = require('./models/User');
const Product = require('./models/Product');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));


sequelize.sync()
.then(result => {
    //console.log('## result : ' , result);
})

app.use('/admin', adminroutes);
app.use(homeroutes);
app.listen(3000);