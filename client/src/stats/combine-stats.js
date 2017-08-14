const combineStats = (tickerCurrencies, profileBalances, profileFee) => {
    const feePercent = profileFee / 100;
    return profileBalances.map((row) => {
        row.gain = row.soldValue - row.boughtValue;
        row.rate = tickerCurrencies[row.currency].bid;
        row.potentialValue = row.rate * row.balance * (1 - (feePercent));
        row.potentialTotalGain = row.potentialValue + row.gain;

        return row;
    });
};

export {
    combineStats,
};
