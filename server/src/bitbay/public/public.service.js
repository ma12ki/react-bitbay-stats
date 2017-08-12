const axios = require('axios');

const { publicApiUrl, defaultFiatCurrency, cryptoCurrencies } = require('../../config');
const cache = require('../cache');
const tickerCacheKey = 'TICKER';

const axiosApi = axios.create({
    baseURL: publicApiUrl,
    method: 'get',
    responseType: 'json',
});

const ticker = async (fiatCurrency = defaultFiatCurrency) => {
    if (cache.has(tickerCacheKey)) {
        return cache.get(tickerCacheKey);
    }
    return tickerRefresh(fiatCurrency);
};

const tickerRefresh = async (fiatCurrency = defaultFiatCurrency) => {
    const promises = Object.keys(cryptoCurrencies)
        .map(currency => tickerOne(currency, fiatCurrency));
    
    const values = await Promise.all(promises);
    
    const ret = {};
    
    values.forEach((val) => {
        ret[val.currency] = val;
    });

    cache.set(tickerCacheKey, ret);

    return ret;
};

const tickerOne = async (cryptocurrency, fiatCurrency = defaultFiatCurrency) => {
    const res = await axiosApi.request({
        url: buildEndpointUri(cryptocurrency, 'ticker', fiatCurrency),
    });

    res.data.currency = cryptocurrency;

    return res.data;
};

const buildEndpointUri = (cryptocurrency, method, fiatCurrency = defaultFiatCurrency) => 
    `${cryptocurrency}${fiatCurrency}/${method}.json`;

module.exports = {
    ticker,
    tickerRefresh,
};
