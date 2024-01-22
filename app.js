console.log('\n\n-: App Started :-');

const express       = require('express');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const MONGODB_URI   = "mongodb+srv://tester:tester1234@cluster0.hlicuim.mongodb.net/Mydb?retryWrites=true&w=majority";


const app           = express();
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



const movieRoute    = require('./routes/movieRoute');
app.use(movieRoute);

const jwt = require('./routes/jwt');
app.use(jwt);


app.use('/', (req, res, next)=>{
    console.log('-: Welcome :-');
    res.send('-: Welcome :-');
    next();
});

console.log('-: App Running :-');
mongoose.connect(MONGODB_URI).then(result => app.listen(3000)).catch(err=>console.log(err));

