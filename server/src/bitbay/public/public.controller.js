const service = require('./public.service');

const ticker = async (req, res) => {
    const value = await service.ticker();
    res.send(value);
};

const tickerRefresh = async (req, res) => {
    const value = await service.tickerRefresh();
    res.send(value);
};

module.exports = {
    ticker,
    tickerRefresh,
};
