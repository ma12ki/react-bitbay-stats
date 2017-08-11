const axios = require('axios');

const { publicApiUrl, defaultFiatCurrency, cryptoCurrencies } = require('../../config');

const axiosApi = axios.create({
    baseURL: publicApiUrl,
    method: 'get',
    responseType: 'json',
});

const ticker = async (fiatCurrency = defaultFiatCurrency) => {
    const promises = Object.keys(cryptoCurrencies)
        .map(currency => tickerOne(currency, fiatCurrency));
    
    const values = await Promise.all(promises);

    const ret = {};

    values.forEach((val) => {
        ret[val.currency] = val;
    });

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
};
