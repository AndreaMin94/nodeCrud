const express = require('express');
const bodyParser = require('body-parser');

//db connection
const sequelize = require('./utils/database');

//routes
const homeroutes = require('./routes/homeroutes');

//models
const User = require('./models/User');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));


sequelize.sync({force: true})
.then(result => {
    console.log('## result : ' , result);
})

app.use(homeroutes);
app.listen(3000);