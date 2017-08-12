const { ticker: tickerService } = require('./public.service');

const ticker = async (req, res) => {
    const value = await tickerService();
    res.send(value);
};

module.exports = {
    ticker,
};
