const USERS = require('./config').server.users;

function check_auth(request) {
    if (!request.headers.authorization)
        return 401;
    const token = request.headers.authorization.replace('Basic ', '', 1);
    if (!USERS.filter(x => Buffer.from(x).toString('base64') === token).length)
        return 403;
    return 200;
}

module.exports = {
    check_auth,
};
