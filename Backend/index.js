const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');
const cors = require('cors');

// App Setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//router(app);
// add 404 not found
app.all('*', (req, res) => res.header(404).send({ status: 404, message: 'page not found!' }));


const port = process.env.PORT || 3000;
const server = http.createServer(app);
// Socket server
//require('./controllers/socket')(server);
server.listen(port);
console.log('Server listening on:', port);