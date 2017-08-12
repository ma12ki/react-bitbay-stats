const express = require('express');
const cors = require('cors');

const { router: bitbayRouter } = require('./bitbay');

const server = express();

server.use(cors());

server.use('/api/v1/', bitbayRouter);

module.exports = {
    server,
};
