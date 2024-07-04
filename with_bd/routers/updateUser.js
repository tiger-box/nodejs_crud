const data = require('../sql-data');
const url = require('url');

module.exports = async (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const id = parseInt(path.split("/")[2]);

    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", async () => {
        const parsebody =  new URLSearchParams(body);
        const updatedData = {};

        parsebody.forEach((value,key) => {
            updatedData[key] = key === 'age' ? parseInt(value): value;
        });
        const updatedUser = await data.updateUser(id, updatedData);

        if(updatedUser){
            res.writeHead(200);
            res.end(JSON.stringify(updatedData))
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User not found'}));
        }
    });


};