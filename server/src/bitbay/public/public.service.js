const axios = require('axios');

const { publicApiUrl } = require('../../config');

const defaultFiatCurrency = 'PLN';

const axiosApi = axios.create({
    baseURL: publicApiUrl,
    method: 'get',
    responseType: 'json',
});

const ticker = async (cryptocurrency, fiatCurrency = defaultFiatCurrency) => {
    const res = await axiosApi.request({
        url: buildEndpointUri(cryptocurrency, 'ticker', fiatCurrency),
    });

    return res.data;
};

const buildEndpointUri = (cryptocurrency, method, fiatCurrency = defaultFiatCurrency) => 
    `${cryptocurrency}${fiatCurrency}/${method}.json`;

module.exports = {
    ticker
};
