import filtersReducer from "../../reducers/filter";
import moment from "moment";

const defState = {
    text : "",
    sortBy : "date",
    startDate : moment().startOf("month"),
    endDate : moment().endOf("month")
};

test("Should setup default filter values",()=>{
    const state = filtersReducer(undefined,{type: "@@INIT"});
    expect(state).toEqual(defState);
})

test("Should set sortBy to amount",()=>{
    const state = filtersReducer(defState,{type: "SORT_BY_AMOUNT"});
    expect(state).toEqual({
        text : "",
        sortBy : "amount",
        startDate : moment().startOf("month"),
        endDate : moment().endOf("month")
    });
})

test("Should set sortBy to date",()=>{
    const state = filtersReducer({
        text : "",
        sortBy : "amount",
        startDate : moment().startOf("month"),
        endDate : moment().endOf("month")
    },{type: "SORT_BY_DATE"});
    expect(state).toEqual(defState);
})

test("Should set text filter",()=>{
    const state = filtersReducer(defState,{
        type: "SET_TEXT",
        text : "gum"
    });
    expect(state).toEqual({
        text : "gum",
        sortBy : "date",
        startDate : moment().startOf("month"),
        endDate : moment().endOf("month")
    });
})

test("Should set start date",()=>{
    const state = filtersReducer(defState,{
        type: "SET_START_DATE",
        startDate : moment().startOf("month").add(2,"days")
    });
    expect(state).toEqual({
        text : "",
        sortBy : "date",
        startDate : moment().startOf("month").add(2,"days"),
        endDate : moment().endOf("month")
    });
})

test("Should set end date",()=>{
    const state = filtersReducer(defState,{
        type: "SET_END_DATE",
        endDate : moment().endOf("month").subtract(6,"days")
    });
    expect(state).toEqual({
        text : "",
        sortBy : "date",
        startDate : moment().startOf("month"),
        endDate : moment().endOf("month").subtract(6,"days")
    });
})