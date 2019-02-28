require('./config/config')
const express = require('express')
const bodyParser = require("body-parser")
const expressValidator = require('express-validator');
const mongoose = require("mongoose")
const flash = require('connect-flash')
const app = express();
var sessions = require("express-session")
var routes = require('./routes/index')
var users = require('./routes/users')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(sessions({
    secret: "Anish",
    resave:false,
    saveUninitialized:true
}))

app.use(expressValidator({
    errorFormatter: function(param, msg , value) {
        var namespace = param.split('.'), root = namespace.shift(), formParam = root;

        while(namespace.length){
            formParam += '['+namespace.shift()+']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true
})
app.set('views', __dirname + '/public'); // general config
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
app.get('/404', function(req, res, next){
next();// trigger a 404 since no other middleware will match /404 after this one, and we're not responding here
});
// app.get('/403', function(req, res, next){// trigger a 403 error
//   var err = new Error('not allowed!');
//   err.status = 403;
//   next(err);
// });


 app.use('/',routes);
app.use('/users',users);
app.use(express.static(__dirname+'/public'));

// app.use(flash())
// app.use(function(req,res,next){
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.user = req.user || null ;
//     next();
//    });


var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server started on localhost:3000 ")
})