const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const path          = require('path');
require('dotenv/config');

/** Database Connectivity */
mongoose.connect( process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then( result =>
{
    /** Create server listener */
    app.listen(process.env.SERVER_PORT);

    /** Make static path for images */
    app.use('/assets/uploads', express.static(path.join(__dirname, 'assets/uploads')));
    app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

    /** Request parsing */
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: true}));

    /** Setup CORS */
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    /** Setup routes */
    app.get('/',(req, res) => {
        res.sendFile(path.join(__dirname + '/app/view/index.html'));
    });
    app.use('/auth', require('./routes/authRoutes'));
    app.use('/blog', require('./routes/blogRoutes'));
})
.catch( err => {
    console.log(err);
});
