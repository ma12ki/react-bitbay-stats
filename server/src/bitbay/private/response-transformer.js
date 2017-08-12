/*

INPUTS
____________________

INFO
{ success: 1,
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
  fee: '0.43' }

TRANSACTIONS
[
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
]

OUTPUT
____________________

{
    fiat: {
        currency: 'PLN',
        balance: 12.3,
    },
    fee: 0.43,
    balances: [
        {
            currency: 'BTC',
            balance: 2,
            soldAmount: 0,
            boughtAmount: 2,
            soldValue: 0,
            boughtValue: 20000,
            gain: -20000,
            transactions: [
                {
                    date: '2017-08-11 19:55:37',
                    type: 'BID',
                    market: 'BTC-PLN',
                    amount: '0.20933452',
                    rate: '12905.00000000',
                    price: '2701.46000000'
                }
            ]
        }
    ]
}

*/

const { defaultFiatCurrency, cryptoCurrencies } = require('../../config');

const transform = (info, transactions) => {
    return Object.assign({}, {
        fiat: getFiatBalance(info),
        fee: getFee(info),
        balances: getCryptoBalances(info, transactions),
    });
};

const getFiatBalance = (info) => {
    return {
        currency: defaultFiatCurrency,
        balance: Number(info.balances[defaultFiatCurrency].available),
    };
};

const getFee = ({ fee }) => Number(fee);

const getCryptoBalances = (info, transactions) => {
    return Object.keys(cryptoCurrencies)
        .map((currency) => {
            const currencyTransactions = getTransactionsForCurrency(currency, transactions);
            const { amount: boughtAmount, value: boughtValue } = getAmountAndValue(getTransactionsForType('BID', currencyTransactions));
            const { amount: soldAmount, value: soldValue } = getAmountAndValue(getTransactionsForType('ASK', currencyTransactions));

            return {
                currency,
                balance: boughtAmount - soldAmount,
                soldAmount,
                soldValue,
                boughtAmount,
                boughtValue,
                gain: soldValue - boughtValue,
                transactions: currencyTransactions,
            };
        });
};

const getTransactionsForCurrency = (currency, transactions) => {
    return transactions.filter((transaction) => {
        return transaction.market.startsWith(currency);
    });
};

const getTransactionsForType = (type, transactions) => transactions.filter((transaction) => transaction.type === type);

const getAmountAndValue = (transactions) => {
    return transactions.reduce((amountAndValue, current) => {
            const { amount: prevAmount, value: prevValue } = amountAndValue;
            const { amount: currAmount, price: currValue } = current;

            return {
                amount: Number(prevAmount) + Number(currAmount),
                value: Number(prevValue) + Number(currValue),
            };
        }, { amount: 0, value: 0 });
};

module.exports = {
    transform,
};