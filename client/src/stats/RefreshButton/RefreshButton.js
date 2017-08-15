import React from 'react';

const RefreshButton = ({ refresh, loading, error, children }) => {
    return (
        <button onClick={refresh} disabled={loading} title={error}>
            refresh
            {children}
        </button>
    );
};

export default RefreshButton;
