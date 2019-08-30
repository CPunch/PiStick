const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const exec = require('child_process').exec;

// user-defined
const routes = require('./routes/index');

const FOLDER = '/mnt/usb_share';
const SHELL_UNMOUNT = "sh " + path.join(__dirname, 'shell_scripts/unmount.sh');
const SHELL_MOUNT = "sh " + path.join(__dirname, 'shell_scripts/mount.sh');
global.FOLDER = FOLDER;
global.SHELL_UNMOUNT = SHELL_UNMOUNT;
global.SHELL_MOUNT = SHELL_MOUNT;

// express stuff
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({limit: '4gb', extended: true}));
app.use(bodyParser.json({limit: '4gb', extended: true}));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public'))); // static files (libraries, images, css, etc) 
app.use('/libs/font-awesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use('/file', express.static(FOLDER)); // USB Flash Over WebApp lol
app.use('/', routes); // /files, /upload

exec(SHELL_MOUNT)

module.exports = app;
