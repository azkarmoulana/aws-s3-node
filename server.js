const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//set up express app
const app = express();

app.use(fileUpload());
app.use(bodyParser.text());

//initialize routers
app.use('/api',require('./routes/api'));

//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests...');
});