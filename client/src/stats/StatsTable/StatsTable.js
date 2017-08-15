import React from 'react';
import { connect } from 'react-redux';

import { getCombined } from '../stats.selectors';

class Cell extends React.PureComponent {
    componentWillMount() {
        console.log('CELL mount', Math.random());
    }

    componentWillReceiveProps(newProps, a) {
        console.log('CELL receive props', newProps, a);
    }

    render() {
        const { value } = this.props;
        return (<td>{value}</td>);
    }

}

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
                <Cell value={row.rate} />
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
            <tfoot>
                <tr>
                    <td>&Sigma;</td>
                    <td colSpan={3}>{getSum(combined, 'boughtValue')}</td>
                    <td colSpan={2}>{getSum(combined, 'soldValue')}</td>
                    <td>{getSum(combined, 'gain')}</td>
                    <td colSpan={2}>{getSum(combined, 'potentialValue')}</td>
                    <td>{getSum(combined, 'potentialTotalGain')}</td>
                </tr>
            </tfoot>
        </table>
    );
};

const getSum = (rows, column) => {
    return rows.reduce((sum, row) => {
        return sum + row[column];
    }, 0);
};

const mapStateToProps = (state) => ({
    combined: getCombined(state),
});

export default connect(mapStateToProps)(StatsTable);
