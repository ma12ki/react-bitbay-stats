const dotenv = require('dotenv');

const { defaultFiatCurrency, cryptoCurrencies } = require('../../../common'); 

dotenv.config();

const publicApiUrl = process.env.BITBAY_PUBLIC_API_URL;
const secretApiUrl = process.env.BITBAY_SECRET_API_URL;
const publicKey = process.env.BITBAY_PUBLIC_KEY;
const secretKey = process.env.BITBAY_SECRET_KEY;

module.exports =  {
    publicApiUrl,
    secretApiUrl,
    publicKey,
    secretKey,
    defaultFiatCurrency,
    cryptoCurrencies,
};
