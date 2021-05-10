const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exhdb = require('express-handlebars');
const users = require('./users')


const app = express();

// Init Middleware
app.use(logger);

// handlebars middleware
app.engine('handlebars', exhdb({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body parse Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//homepahr rout
app.get('/',(req,res)=>{
    res.render('index',{
        title: 'User Apps',
        users
    });
})

// api
app.use('/api/users',require('./routes/api/users'))

//set static floder
app.use(express.static(path.join(__dirname,'public')));

//connect server
const PORT  = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('server is running on ' + PORT);
});