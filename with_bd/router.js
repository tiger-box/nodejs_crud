const url = require('url');

const createUser = require('./routers/createUser');
const deleteteUser = require('./routers/deleteUser');
const getUser = require('./routers/getUser');
const listUsers = require('./routers/listUsers');
const updateUser = require('./routers/updateUser');

const routeHandler = function (req, res) {
    const parseUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parseUrl.pathname;

    res.setHeader('Content-type', 'application/json');

    if (path === '/users' && method === 'GET') {
        listUsers(req, res);
    } else if (path === '/users' && method === 'POST') {
        createUser(req, res);
    } else if (path.startsWith('/users') && method === 'GET') {
        getUser(req, res);
    } else if (path.startsWith('/users') && method === 'PUT') {
        updateUser(req, res);
    } else if (path.startsWith('/users') && method === 'DELETE') {
        deleteteUser(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
}

module.exports = routeHandler;