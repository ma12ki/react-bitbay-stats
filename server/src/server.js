const express = require('express');
const cors = require('cors');

const { ticker, info, history, transactions } = require('./bitbay');

const server = express();
const router = express.Router();

router.get('/ticker', ticker);

server.use(cors());

server.use('/api/v1/', router);

module.exports = {
    server,
};
