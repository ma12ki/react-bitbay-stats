const express = require('express');

const public = require('./public');
const private = require('./private');

const router = express.Router();

router.get('/ticker', public.ticker);
router.get('/ticker/refresh', public.tickerRefresh);
router.get('/status', private.status);
router.get('/status/refresh', private.statusRefresh);

module.exports = {
    router,
};
