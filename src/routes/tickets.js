const express = require('express');
const send_mail = require('../mail');
const TICKETS = require('../models/tickets');

const required_fields = ["name", "surname", "phone", "school", "class", "faculty"];
const router = express.Router();

function validate(object) {
    return required_fields.every(x => object[x]) && String(object.phone).length === 11 && Number(object.phone);
}

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

module.exports = router;
