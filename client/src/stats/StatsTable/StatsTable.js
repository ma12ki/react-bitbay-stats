import React from 'react';
import { connect } from 'react-redux';

import { getCombined } from '../stats.selectors';

const StatsTable = ({ combined }) => {
    const rows = combined.map((row) => {
        return (
            <tr key={row.currency}>
                <td>{row.currency}</td>
                <td>{row.balance}</td>
                <td>{row.boughtAmount}</td>
                <td>{row.boughtValue}</td>
                <td>{row.soldAmount}</td>
                <td>{row.soldValue}</td>
                <td>{row.gain}</td>
                <td>{row.rate}</td>
                <td>{row.potentialValue}</td>
                <td>{row.potentialTotalGain}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>currency</th>
                    <th>balance</th>
                    <th>boughtAmount</th>
                    <th>boughtValue</th>
                    <th>soldAmount</th>
                    <th>soldValue</th>
                    <th>gain</th>
                    <th>rate</th>
                    <th>potentialValue</th>
                    <th>potentialTotalGain</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

const mapStateToProps = (state) => ({
    combined: getCombined(state),
});

export default connect(mapStateToProps)(StatsTable);
