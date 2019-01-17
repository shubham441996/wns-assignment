const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wns-demo');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/checking', function(req, res){
   res.json({
      "Tutorial": "Welcome to the Node express JWT"
   });
});

app.use('/user', user);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});