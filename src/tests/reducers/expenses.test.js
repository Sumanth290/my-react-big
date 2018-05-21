import expensesReducer from "../../reducers/expenses";
import moment from "moment";
import prevState from "../fixtures/expenses";

test("Should set default state",()=>{
    expect(expensesReducer(undefined,{type:"@@INIT"})).toEqual([]);
});

test("Should Add expense to state",()=>{
    expect(expensesReducer(prevState,{
        type:"ADD_EXPENSE",
        expense : {
            id : "4",
            desc : "gas",
            note: "",
            amount: 34500,
            timestamp : moment(0).add(10,"days")
        }
    })).toEqual(prevState.concat([{
        id : "4",
        desc : "gas",
        note: "",
        amount: 34500,
        timestamp : moment(0).add(10,"days")
    }]));
});

test("Should remove expense from state",()=>{
    expect(expensesReducer(prevState,{
        type:"REMOVE_EXPENSE",
        id: "3"
    })).toEqual([prevState[0],prevState[1]]);
});

test("Should not remove expense from state for wrong id",()=>{
    expect(expensesReducer(prevState,{
        type:"REMOVE_EXPENSE",
        id: "7"
    })).toEqual(prevState);
});

test("Should edit expense of state",()=>{
    expect(expensesReducer(prevState,{
        type:"EDIT_EXPENSE",
        id: "2",
        updates : {
            note : "Added new note",
            amount: 10950,
            timestamp : moment(0).subtract(7,"days")
        }
    })[1]).toEqual({
        id : "2",
        desc : "rent",
        note : "Added new note",
        amount: 10950,
        timestamp : moment(0).subtract(7,"days")
    });
});

test("Should edit expense of state if id doesn't match",()=>{
    expect(expensesReducer(prevState,{
        type:"EDIT_EXPENSE",
        id: "8",
        updates : {
            note : "Added new note",
            amount: 10950,
            timestamp : moment(0).subtract(7,"days")
        }
    })).toEqual(prevState);
});

test("Should set expenses",() => {
    const expenses = [prevState[0],prevState[2]];
    expect(expensesReducer(prevState,{
        type: "SET_EXPENSES",
        expenses
    })).toEqual(expenses);
});