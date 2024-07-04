const data = require('../sql-data');
const url = require('url');

module.exports = async (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const id = parseInt(path.split("/")[2]);
    
    const succes = await data.deleteUser(id);

    if(succes){
        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'User not found'}));
    }
}