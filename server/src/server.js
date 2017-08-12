const express = require('express');
const cors = require('cors');

const { ticker, status } = require('./bitbay');

const server = express();
const router = express.Router();

router.get('/ticker', ticker);
router.get('/status', status);

server.use(cors());

server.use('/api/v1/', router);

module.exports = {
    server,
};
