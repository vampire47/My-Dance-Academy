const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 80;
const bodyparser = require("body-parser");


//Define mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    phone: String
});

var Contact = mongoose.model('Contact', contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res) => {

    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {

    const params = {}
    res.status(200).render('services.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
            res.send("Form Submitted Successfully!")
        }).catch(() => {
            res.status(400).send("Unable to send the form!")
        })
        //res.status(200).render('contact.pug');

})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});