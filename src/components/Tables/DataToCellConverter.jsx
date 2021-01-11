import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
/**
 * unqiue number used for keys/id's
 */
let uniqueId = 0;

export class DataToCellConverter extends Component {
    static propTypes = {
        hideColumns: PropTypes.objectOf(PropTypes.string),
        header: PropTypes.string,
        index: PropTypes.any,
        value: PropTypes.any,
        dateColumns: PropTypes.array,
    }
    constructor(props) {
        super(props);
    }
    /**
    * gets a unique id for keys
    */
    getId() {
        uniqueId++
        return uniqueId;
    }
    formatDate = () => {
        const { hideColumns, header, index, value } = this.props;
            const id = this.getId();
            var date = moment.utc(value).toDate()
            let newValue = moment(date).format("LLL")           
            return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
            id={id} key={"cell-" + index}>{newValue}</td>;
    }
    formatLatency() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
            id={id} key={"cell-" + index}>{value === 0 ? value + " ms" : " "}</td>;
    }
    formatDefault() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
            id={id} key={"cell-" + index}>{value}</td>;
    }
    formatIsReachable() {
        const { hideColumns, header, index, value } = this.props;
        const id = this.getId();
        if (value === true)
            return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                id={id} key={"cell-" + index}><div className="on-icon">
                    <i className="fa fa-check-circle" aria-hidden="true"></i></div></td>;
        else
            return <td headers={header} className={(header === hideColumns[header] ? "hide" : "")}
                id={id} key={"cell-" + index}><div className="off-icon">
                    <i className="fa fa-times-circle" aria-hidden="true"></i></div></td>;
    }
    getHeaderType() {
        const { header, dateColumns } = this.props;
        if (!header)
            return "NoHeaderFound";
        const dateCheck = dateColumns ? dateColumns.includes(header) : false;
        const head = header.toLowerCase();
        let returnValue;
        if (dateCheck) 
            returnValue = "date";
        else if (head === "latency")
            returnValue = "latency"
        else if(head === "isreachable")
            returnValue = "isreachable"
        else returnValue = head;
        return returnValue;
    }
    render() {
        const { hideColumns, header, index } = this.props;
        let htmlData;
        const headertype = this.getHeaderType();
        switch (headertype) {
            case "latency":
                htmlData = this.formatLatency();
                break;
            case "isreachable":
                htmlData = this.formatIsReachable();
                break;
            case "date":
                htmlData = this.formatDate();
                break;
            default:
                htmlData = this.formatDefault();
        }
        return htmlData;
    }
}

