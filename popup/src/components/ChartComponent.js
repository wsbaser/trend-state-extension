import React from 'react';
import Chart from './Chart';

export class ChartComponent extends React.Component {
    componentDidMount() {

        fetch('http://92.53.120.34/api/SampleData/Candles')
            .then(response => response.json())
            .then(candles => candles.map(c => {
                c.date = new Date(c.date);
                return c;
            }))
            .then(data => {
                this.setState({ data });
            });
    }

    render() {
        if (this.state == null) {
            return <div class="loader">Loading...</div>
        }
        return (
            <div>
                <Chart type="hybrid" data={this.state.data} />
            </div>
        )
    }
}
