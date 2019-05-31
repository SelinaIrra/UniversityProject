const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json(NEWS)
});

/* GET new by id*/
router.get('/:id', function (req, res, next) {
    res.json(NEWS[req.param('id')]);
});

module.exports = router;
