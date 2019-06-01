const express = require('express');
const NEWS = require('../models/news');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    const params = req.query;
    params.count = params.count ? Number(params.count) : 10;
    params.offset = params.offset ? Number(params.offset) : 0;
    if (!(params.count > 0 && params.offset >= 0)) {
        return res.status(400).json({});
    }
    NEWS.find({}, null, {
        sort: '-date',
        limit: params.count,
        skip: params.offset,
    }, (err, arr) => {
        if (err) {
            console.error(err);
            res.status(500).json({});
            return;
        }
        res.json({
            offset: params.offset,
            count: arr.length,
            data: arr.map(x => ({
                id: x.id,
                title: x.title,
                image: x.image,
                date: x.date,
                text: x.text,
            }))
        });
    });
});

/* GET new by id*/
router.get('/:id', function (req, res, next) {
    NEWS.findById(req.params.id, (err, single_new) => {
        if (err) {
            if (err.kind === "ObjectId")
                return res.status(204).json({});
            console.error(err);
            return res.status(500).json({});
        }
        res.json({
            id: single_new.id,
            title: single_new.title,
            date: single_new.date,
            html: single_new.html,
        });
    });
});

module.exports = router;
