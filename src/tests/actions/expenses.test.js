    import {startAddExpense,addExpense,removeExpense,editExpense} from "../../actions/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";


const createMockStore = configureStore([thunk]);

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
            desc : "My Expense 1",
            note : "My note 1",
            amount : 12,
            timestamp : action.expense.timestamp
        }
    });
});

test("Should add expense to database and store",(done) => {
    const store = createMockStore({});
    const expenseData = {
        desc : "My Expense 1",
        note : "My note 1",
        amount : 12,
        timestamp : 10000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type : "ADD_EXPENSE",
            expense : {
                ...expenseData,
                id : expect.any(String)
            }
        });
        console.log(actions[0].expense.id);
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("Should add expense with defaults to database and store",(done) => {
    const store = createMockStore({});
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type : "ADD_EXPENSE",
            expense : {
                desc : "",
                note : "",
                amount : 0,
                timestamp : 0,
                id : expect.any(String)
            }
        });
        console.log(actions[0].expense.id);
        return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            desc : "",
            note : "",
            amount : 0,
            timestamp : 0
        });
        done();
    });
});

// test("Should test addExpense action with default values",()=>{
//     const action = addExpense();
//     expect(action).toEqual({
//         type : "ADD_EXPENSE",
//         expense : {
//             desc : "",
//             note : "",
//             amount : 0,
//             timestamp : 0
//         }
//     });
// });

