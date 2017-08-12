const express = require('express');
const cors = require('cors');

const bitbay = require('./bitbay');

const server = express();
const router = express.Router();

router.get('/ticker', bitbay.ticker);
router.get('/ticker/refresh', bitbay.tickerRefresh);
router.get('/status', bitbay.status);
router.get('/status/refresh', bitbay.statusRefresh);

server.use(cors());

server.use('/api/v1/', router);

module.exports = {
    server,
};
