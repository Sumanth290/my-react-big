import React from "react";
import {shallow} from "enzyme";
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {defaultfilters,altfilters} from "../fixtures/filters";
import moment from "moment";

let sortByAmountDispatcher, sortBydateDispatcher, startDateDispatcher, endDateDispatcher, textFilterDispatcher,wrapper;

beforeEach(() =>{
    sortByAmountDispatcher = jest.fn();
    sortBydateDispatcher = jest.fn();
    startDateDispatcher = jest.fn();
    endDateDispatcher = jest.fn();
    textFilterDispatcher = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
        filters={defaultfilters}
        sortByAmountDispatcher={sortByAmountDispatcher}
        sortBydateDispatcher={sortBydateDispatcher}
        startDateDispatcher={startDateDispatcher}
        endDateDispatcher={endDateDispatcher}
        textFilterDispatcher={textFilterDispatcher}
        />
    );
});

test("should render ExpenseListFilters",() => {
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with altData",() => {
    wrapper.setProps({
        filters: altfilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("should handle sortBy date",() => {
    wrapper.find("input").at(1).simulate("change",{
        target : { value : "date" }
    });
    expect(sortBydateDispatcher).toHaveBeenCalled();
});

test("should handle sortBy amount",() => {
    wrapper.find("input").at(2).simulate("change",{
        target : { value : "amount" }
    });
    expect(sortByAmountDispatcher).toHaveBeenCalled();
});

test("should handle dates change",() => {
    wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
        startDate : moment(0).subtract(3,"days"),
        endDate : moment(0).add(9,"days")
    });
    expect(wrapper.state("startDate")).toEqual(moment(0).subtract(3,"days"));
    expect(wrapper.state("endDate")).toEqual(moment(0).add(9,"days"));
    expect(startDateDispatcher).toHaveBeenLastCalledWith(moment(0).subtract(3,"days"));
    expect(endDateDispatcher).toHaveBeenLastCalledWith(moment(0).add(9,"days"));
});

test("should handle focus change",() => {
    wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")("startDate");
    expect(wrapper.state("calendarFocused")).toBe("startDate");
});

test("should handle text change",() => {
    wrapper.find("input").at(0).simulate("change",{
        target : { value : "new Text" }
    });
    expect(textFilterDispatcher).toHaveBeenLastCalledWith("new Text");
});