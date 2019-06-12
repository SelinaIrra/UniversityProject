const USERS = require('./config').server.users;

function check_auth(request) {
    if (!request.headers.authorization)
        return false;
    const token = request.headers.authorization.replace('Basic ', '', 1);
    if (!USERS.filter(x => Buffer.from(x).toString('base64') === token).length)
        return false;
    return true;
}

module.exports = {
    check_auth,
};
