const axios = require('axios').default;
const crypto = require('crypto');

const { secretApiUrl, publicKey, secretKey, defaultFiatCurrency } = require('../../config');
const { transform } = require('./response-transformer');
const cache = require('../cache');
const statusCacheKey = 'STATUS';
const requiredWaitBetweenCalls = 1200;

const status = async () => {
    if (cache.has(statusCacheKey)) {
        return cache.get(statusCacheKey);
    }
    return statusRefresh();
};

const statusRefresh = async () => {
    const profileInfo = await info();
    await wait(requiredWaitBetweenCalls);
    const profileTransactions = await transactions();
    const transformed = transform(profileInfo, profileTransactions);

    cache.set(statusCacheKey, transformed);

    return transformed;
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
    status,
    statusRefresh,
};
