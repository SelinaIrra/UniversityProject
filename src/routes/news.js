const express = require('express');
const NEWS = require('../models/news');
const router = express.Router();
const check_auth = require('../utils').check_auth;

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
            return res.status(500).json({});
        }
        res.json({
            offset: params.offset,
            count: arr.length,
            data: arr.map(x => ({
                id: x.id,
                title: x.title,
                image: x.image,
                date: x.date.toLocaleDateString('ru-RU'),
                text: x.text,
            }))
        });
    });
});

router.get('/all', function (req, res, next) {
    NEWS.find({}, null, {
        sort: '-date',
    }, (err, arr) => {
        if (err) {
            console.error(err);
            return res.status(500).json({});
        }
        res.json(arr.map(x => ({
                id: x.id,
                title: x.title,
                image: x.image,
                html: x.html,
                date: x.date.toLocaleDateString('ru-RU'),
                text: x.text,
            })));
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
            date: single_new.date.toLocaleDateString('ru-RU'),
            html: single_new.html,
            image: single_new.image
        });
    });
});

router.post('/', function (req, res, next) {
    if (!check_auth(req))
        return res.set('WWW-Authenticate', 'Basic realm="401"').status(401).send();

    const params = req.body;
    NEWS.create({
        title: params.title,
        image: params.image,
        text: params.text,
        html: params.html,
    }, (err, obj) => {
        if (err) {
            console.log(err);
            return res.status(400).json({});
        }
        res.json({
            id: obj.id,
            date: obj.date.toLocaleDateString('ru-RU'),
            title: obj.title,
            image: obj.image,
            text: obj.text,
            html: obj.html,
        })
    });
});

router.patch('/', function (req, res, next) {
    if (!check_auth(req))
        return res.set('WWW-Authenticate', 'Basic realm="401"').status(401).send();

    const params = req.body;
    NEWS.findByIdAndUpdate(params.id, params, {new: true}, (err, obj) => {
        if (err) {
            console.log(err);
            return res.status(500).json({});
        }
        return res.json({
            id: obj.id,
            date: obj.date.toLocaleDateString('ru-RU'),
            title: obj.title,
            image: obj.image,
            text: obj.text,
            html: obj.html,
        });
    })
});

router.delete('/', function (req, res, next) {
    if (!check_auth(req))
        return res.set('WWW-Authenticate', 'Basic realm="401"').status(401).send();

    const params = req.body;
    NEWS.findByIdAndDelete(params.id, (err) => {
        if (err) {
            if (err.kind === "ObjectId")
                return res.status(204).json({});
            console.log(err);
            return res.status(500).json({});
        }
        return res.status(204).json({});
    });
});

module.exports = router;
