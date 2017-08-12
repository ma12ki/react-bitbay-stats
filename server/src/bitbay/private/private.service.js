const axios = require('axios').default;
const crypto = require('crypto');

const { secretApiUrl, publicKey, secretKey, defaultFiatCurrency } = require('../../config');
const { transform } = require('./response-transformer');
const rquiredWaitBetweenCalls = 1200;

const status = async () => {
    const profileInfo = await info();
    await wait(rquiredWaitBetweenCalls);
    const profileTransactions = await transactions();

    return transform(profileInfo, profileTransactions);
};

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

const wait = (millis) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    });
};

module.exports = {
    status
};
