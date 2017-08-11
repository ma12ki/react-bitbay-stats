const { ticker, info, history, transactions } = require('./bitbay');

ticker().then(res => {
    console.log(res);
});

// transactions().then(res => console.log(res));
