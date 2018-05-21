    import {startAddExpense,addExpense,removeExpense,editExpense,setExpenses,startSetExpenses} from "../../actions/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";


const createMockStore = configureStore([thunk]);
const expensesData = {};
    expenses.forEach(({id,desc,amount,note,timestamp}) => {
        expensesData[id] = {desc,amount,note,timestamp :timestamp.valueOf()};
    });

beforeEach((done) => {
    database.ref("expenses").set(expensesData).then(() => done());
});

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

test("should setUp expense action object with data",() => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses
    });
});

test("Should fetch expenses from database",(done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        expect(store.getActions()[0]).toEqual({
            type: "SET_EXPENSES",
            expenses : expenses.map((expense) => ({
                ...expense,
                timestamp : expense.timestamp.valueOf()
            }))
        });
        done();
    });
});

