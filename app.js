const Server = require('./models/server');

//require('dotenv').config({path:'.env'});
require('dotenv').config();


const server = new Server();

server.listen();