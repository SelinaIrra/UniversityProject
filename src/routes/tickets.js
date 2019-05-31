const express = require('express');
const send_mail = require('../mail');

const required_fields = ["name", "surname", "phone", "school", "class", "faculty"];
const router = express.Router();

/* GET users listing. */
function validate(object) {
    return required_fields.every(x => object[x]) && String(object.phone).length === 11 && Number(object.phone);
}

router.post('/', function (req, res, next) {
    const params = req.body;
    if (!validate(params)) {
        res.status(400).json({error: "Invalid data"});
    } else {
        res.json({});
        send_mail(
            `${params.name} ${params.surname} ${params.patronymic}`,
            params.school,
            params.class,
            params.faculty,
            params.phone
        )
    }
});

module.exports = router;
