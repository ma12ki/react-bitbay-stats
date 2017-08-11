const axios = require('axios').default;
const crypto = require('crypto');

const { secretApiUrl, publicKey, secretKey } = require('../../config');

const defaultFiatCurrency = 'PLN';

const info = async () => {
    return apiRequest('info');
};

const history = async (fiatCurrency = defaultFiatCurrency, limit = 1000) => {
    return apiRequest('history', {
        currency: fiatCurrency,
        limit,
    });
};

const transactions = async () => {
    return apiRequest('transactions');
};

const apiRequest = async (method, params = {}) => {
    const payload = toQueryString(Object.assign({}, params, {
        method,
        moment: Math.floor(Date.now() / 1000),
    }));
    const signature = hash(payload);
    const headers = {
        'API-Key': publicKey,
        'API-Hash': signature,
    };
    const res = await axios.post(secretApiUrl, payload, {
        responseType: 'json',
        headers,
    });

    return res.data;
};

const toQueryString = (paramsObject) =>
  Object
    .keys(paramsObject)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
    .join('&');

const hash = (text) => {
    const hash = crypto.createHmac('sha512', secretKey);
    hash.update(text);
    const value = hash.digest('hex');

    return value;
};

module.exports = {
    info,
    history,
    transactions,
};
