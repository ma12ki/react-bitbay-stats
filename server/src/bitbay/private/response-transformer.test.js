const { transform } = require('./response-transformer');

const info = {
    success: 1,
    balances:
    { PLN: { available: '11.25', locked: '0.00' },
        EUR: { available: '0.00', locked: '0.00' },
        USD: { available: '0.00', locked: '0.00' },
        BTC: { available: '0.28568030', locked: '0.00000000' },
        LTC: { available: '9.95700000', locked: '0.00000000' },
        ETH: { available: '1.84253619', locked: '0.00000000' },
        LSK: { available: '150.76268945', locked: '0.00000000' },
        BCC: { available: '0.70326522', locked: '0.00000000' } },
    addresses:
    { BTC: 'aaaa',
        LTC: 'bbbb',
        ETH: 'cccc',
        LSK: 'dddd',
        BCC: 'eeee' },
    fee: '0.43'
};

const transactions = [
  { date: '2017-08-11 20:17:00',
    type: 'BID',
    market: 'BCC-PLN',
    amount: '0.56209508',
    rate: '1789.00000000',
    price: '1005.58000000' },
  { date: '2017-08-11 19:55:37',
    type: 'BID',
    market: 'BTC-PLN',
    amount: '0.20933452',
    rate: '12905.00000000',
    price: '2701.46000000' }
];

test('transforms inputs correctly', () => {
    const ret = transform(info, transactions);
    console.log(ret);
});
