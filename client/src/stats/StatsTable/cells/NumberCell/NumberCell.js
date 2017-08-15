import React from 'react';

export default ({ fractionDigits = 2, children, ...rest }) => {
    const value = children !== null ? children.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }) : 'N/A';

    return (<td {...rest}>{value}</td>);
};
