const { ticker } = require('./bitbay');

ticker('BTC').then(res => {
    console.log(res);
});
