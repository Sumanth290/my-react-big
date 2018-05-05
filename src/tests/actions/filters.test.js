import {
    setTextFilter,
    setStartDate,
    setEndDate,
    sortBydate,
    sortByAmount
} from "../../actions/filters";
import moment from "moment";


test("Should generate set start date action",() => {
    expect(setStartDate(moment("2017-02-14"))).toEqual({
        type : "SET_START_DATE",
        startDate : moment("2017-02-14")
    });
});

test("Should generate set end date action",() => {
    expect(setEndDate(moment("2017-02-14"))).toEqual({
        type : "SET_END_DATE",
        endDate : moment("2017-02-14")
    });
});

test("Should generate sort By date action",() => {
    expect(sortBydate()).toEqual({
        type: "SORT_BY_DATE"
    });
});

test("Should generate sort By amount action",() => {
    expect(sortByAmount()).toEqual({
        type: "SORT_BY_AMOUNT"
    });
});

test("should generate set Text Filter action",()=>{
    expect(setTextFilter("Sumanthdhf")).toEqual({
        type: "SET_TEXT",
        text : "Sumanthdhf"
    });
});

test("should generate set Text Filter default action",()=>{
    expect(setTextFilter()).toEqual({
        type: "SET_TEXT",
        text : ""
    });
});