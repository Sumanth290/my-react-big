import React from "react";
import { connect } from "react-redux";
import {setTextFilter,sortByAmount,sortBydate,setStartDate,setEndDate} from "../actions/filters";
import { DateRangePicker } from "react-dates";

export class ExpenseListFilters extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            calendarFocused: null,
        };
    }
    
    handleSortFilterChange = (e) => {
        (e.target.value && e.target.value === "amount") ? 
            this.props.sortByAmountDispatcher() : 
            this.props.sortBydateDispatcher()
    };

    handleDateChange = ({startDate,endDate}) => {
        this.setState(() => ({ startDate,endDate }));
        this.props.startDateDispatcher(startDate);
        this.props.endDateDispatcher(endDate);
    };

    handleFocusChange = (focused) => {
        console.log(focused);
        this.setState(() => ({ calendarFocused: focused}));
    };

    handleTextChange = (e) => {
        this.props.textFilterDispatcher(e.target.value);
    };
    
    render(){
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input 
                            className="text-input"
                            type="text"
                            value={this.props.filters.text} 
                            onChange={this.handleTextChange}
                            placeholder="Search expenses"
                        />
                    </div>
                    <div className="input-group__item">
                        <div className="radio-group">
                            <div>
                                <input 
                                    className="radio"
                                    type="radio" 
                                    name="sortFilter" 
                                    onChange={this.handleSortFilterChange} 
                                    value="date" 
                                    id="date"
                                    checked={this.props.filters.sortBy === "date"}
                                />
                                <label className="labels" htmlFor="date">Date</label>
                            </div>
                            <div>
                                <input 
                                    className="radio"
                                    type="radio" 
                                    name="sortFilter" 
                                    onChange={this.handleSortFilterChange} 
                                    value="amount" 
                                    id="amount"
                                    checked={this.props.filters.sortBy === "amount"}
                                />
                                <label className="labels" htmlFor="amount">Amount</label>
                            </div>
                        </div>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate} 
                            startDateId="filterStartDate"
                            endDate={this.props.filters.endDate} 
                            endDateId="filterEndDate"
                            onDatesChange={this.handleDateChange} 
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.handleFocusChange}
                            showClearDates={true}
                            isOutsideRange={() => ( false )}
                            numberOfMonths={1}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({filters : state.filters});

const mapDispatchToProps = (dispatch) => ({
    sortByAmountDispatcher : () => dispatch(sortByAmount()),
    sortBydateDispatcher : () => dispatch(sortBydate()),
    startDateDispatcher : (startDate) => dispatch(setStartDate(startDate)),
    endDateDispatcher : (endDate) => dispatch(setEndDate(endDate)),
    textFilterDispatcher : (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilters);