const express = require('express');
const router = express.Router();
const path = require('path');
const check_auth = require('../utils').check_auth;

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!check_auth(req))
        return res.set('WWW-Authenticate', 'Basic realm="401"').status(401).send();

    res.sendFile(path.resolve('src/admin.html'));
});

module.exports = router;
