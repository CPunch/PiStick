const express = require('express');
const {combineARGS} = require('./routerapi');

const router = express.Router();

// setup routes
require('./upload')(router);
require('./files')(router);

// redirect all captive portal logins to the files page
router.get('*', (req, res) => {
	res.redirect('/files');
});

module.exports = router;
