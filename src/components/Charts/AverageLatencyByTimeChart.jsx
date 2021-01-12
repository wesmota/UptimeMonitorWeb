import React, { Component, Fragment } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import LoadingSpinner from '../Design/LoadingSpinner';
import "./AverageLatencyByTimeChart.css";

export default class AverageLatencyByTimeChart extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
        this.chartRef = React.createRef();

    }
    componentDidMount() {
        const { labels, title, data, backgroundColor } = this.props;
        let titleExists = title ? true : false;
        var option = {
            responsive: true,
            legend: {
                position: "bottom",
                display: false
            },
            title: {
                position: "top",
                display: titleExists,
                text: title,

            },
            aspectRatio: 1
        }
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options: option,
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColor ? backgroundColor :
                        [
                            'rgba(50, 200, 82, 1)',
                            'rgba(238, 51, 23, 1)'
                        ]
                }]
            }
        });

    }
    componentDidUpdate(prevProps, prevState) {
        const { data, labels, title, backgroundColor } = this.props;
        if (prevProps.data !== data || prevState !== this.state)
            if (data !== null && data !== undefined) {
                this.myChart.data.datasets[0].data = data;
                this.myChart.data.labels = labels;
                this.myChart.data.label = title
                this.myChart.data.datasets[0].backgroundColor = backgroundColor ?
                    backgroundColor : this.myChart.data.datasets[0].backgroundColor
                this.myChart.update();
                if (this.state.isLoading == true) this.setState({ isLoading: false })
            }
    }
    render() {
        return (
            <Fragment>
                {(this.state.isLoading) ? <LoadingSpinner></LoadingSpinner> : ""}
                <div className={this.state.isLoading ? "hide" : ""}>
                    <canvas ref={this.chartRef} />
                </div>
            </Fragment>
        );
    }
}