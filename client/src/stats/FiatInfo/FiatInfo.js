import React from 'react';

import { defaultFiatCurrency } from '../../config';

export default () => {
    return (
        <div>
            Fiat currency balance ({defaultFiatCurrency}): 0
        </div>
    );
};
