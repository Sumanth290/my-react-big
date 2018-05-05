import {addExpense,removeExpense,editExpense} from "../../actions/expenses";
import moment from "moment";

test("Should test removeExpense action",() => {
    expect(removeExpense("abc111")).toEqual({
        type : "REMOVE_EXPENSE",
        id: "abc111"
    });
});

test("Should test editExpense action",() => {
    expect(editExpense("abc111",{desc:"wrsgfedfg",note: "New Note value"})).toEqual({
        type: "EDIT_EXPENSE",
        id : "abc111",
        updates : {desc:"wrsgfedfg",note: "New Note value"}
    });
});

test("Should test addExpense action with provided values",()=>{
    const action = addExpense({
        desc : "My Expense 1",
        note : "My note 1",
        amount : 12,
        timestamp : moment()
    });
    expect(action).toEqual({
        type : "ADD_EXPENSE",
        expense : {
            id : expect.any(String),
            desc : "My Expense 1",
            note : "My note 1",
            amount : 12,
            timestamp : action.expense.timestamp
        }
    });
});

test("Should test addExpense action with default values",()=>{
    const action = addExpense();
    expect(action).toEqual({
        type : "ADD_EXPENSE",
        expense : {
            id : expect.any(String),
            desc : "",
            note : "",
            amount : 0,
            timestamp : 0
        }
    });
});

