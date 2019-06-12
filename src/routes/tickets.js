const express = require('express');
const send_mail = require('../mail');
const TICKETS = require('../models/tickets');
const check_auth = require('../utils').check_auth;

const required_fields = ["name", "surname", "phone", "school", "class", "faculty"];
const router = express.Router();

function validate(object) {
    return required_fields.every(x => object[x]) && String(object.phone).length === 11 && Number(object.phone);
}

router.get('/', function (req, res) {
    const auth_status = check_auth(req);
    if (auth_status !== 200)
        return res.set('WWW-Authenticate', 'Basic realm="401"').status(auth_status).json({});

    const params = req.query;
    params.count = params.count ? Number(params.count) : 10;
    params.offset = params.offset ? Number(params.offset) : 0;
    if (!(params.count > 0 && params.offset >= 0)) {
        return res.status(400).json({});
    }
    TICKETS.find({}, null, {
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
            data: arr.map(x => { return {
                id: x.id,
                fio: x.fio,
                school: x.school,
                class: x.class,
                faculty: x.faculty,
                phone: x.phone,
            }})
        });
    });
});

router.post('/', function (req, res, next) {
    const params = req.body;
    if (!validate(params)) {
        return res.status(400).json({error: "Invalid data"});
    }
    TICKETS.create({
        fio: `${params.surname} ${params.name} ${params.patronymic}`,
        school: params.school,
        class: params.class,
        faculty: params.faculty,
        phone: String(params.phone),
    }, function (err) {
        if (err)
            return res.status(500).json({});
        res.json({});
    });
    try {
        send_mail(`${params.surname} ${params.name} ${params.patronymic}`,
            params.school,
            params.class,
            params.faculty,
            params.phone
        );
    } catch (err) {
        console.error(err);
    }
});

router.delete('/', function (req, res) {
    const auth_status = check_auth(req);
    if (auth_status !== 200)
        return res.status(auth_status).json({});

    const params = req.body;
    TICKETS.findByIdAndDelete(params.id, (err) => {
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
