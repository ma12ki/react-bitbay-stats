import React from 'react';

import './NumberCell.css';

const getValueClassName = (value) => {
    if (value > 0) {
        return 'positive';
    }
    if (value < 0) {
        return 'negative';
    }
    return 'neutral';
};

export default ({ fractionDigits = 2, children, ...rest }) => {
    const value = children !== null ? children.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }) : 'N/A';

    const valueClassName = getValueClassName(children);

    return (<td {...rest}><span className={'NumberCell-' + valueClassName}>{value}</span></td>);
};
