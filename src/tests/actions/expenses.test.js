import {
    startAddExpense,addExpense,removeExpense,editExpense,setExpenses,startSetExpenses, 
    startRemoveExpense,startEditExpense
} from "../../actions/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

const uid = "sdt34654hrt6ery56bdh";
const createMockStore = configureStore([thunk]);
const expensesData = {};

expenses.forEach(({id,desc,amount,note,timestamp}) => {
    expensesData[id] = {desc,amount,note,timestamp :timestamp.valueOf()};
});

beforeEach((done) => {
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test("Should test removeExpense action",() => {
    expect(removeExpense("abc111")).toEqual({
        type : "REMOVE_EXPENSE",
        id: "abc111"
    });
});

test("Should remove expense from database and store",(done) => {
    const store = createMockStore( {auth : { uid } } );
    store.dispatch(startRemoveExpense(2)).then(() => {
        expect(store.getActions()[0]).toEqual({
            type : "REMOVE_EXPENSE",
            id : 2
        });
        return database.ref(`users/${uid}/expenses/2`).once("value").then((snapshot) =>{
            expect(snapshot.val()).toEqual(null);
            done();
        });
    });
});

test("Should test editExpense action",() => {
    expect(editExpense("abc111",{desc:"wrsgfedfg",note: "New Note value"})).toEqual({
        type: "EDIT_EXPENSE",
        id : "abc111",
        updates : {desc:"wrsgfedfg",note: "New Note value"}
    });
});

test("Should edit expense and update to database and store",(done) => {
    const store = createMockStore({auth : { uid } });
    store.dispatch(startEditExpense(2,{
        note : "Added note :)",
        desc : "Rental"
    })).then(() => {
        expect(store.getActions()[0]).toEqual({
            type : "EDIT_EXPENSE",
            id : 2,
            updates : {
                note : "Added note :)",
                desc : "Rental"
            }
        });
        return database.ref(`users/${uid}/expenses/2`).once("value").then((snapshot) =>{
            expect(snapshot.val()).toEqual({
                ...expensesData[2],
                note : "Added note :)",
                desc : "Rental"
            });
            done();
        });
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
    const store = createMockStore({auth : { uid } });
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test("Should add expense with defaults to database and store",(done) => {
    const store = createMockStore({auth : { uid } });
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
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
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
    const store = createMockStore({auth : { uid } });
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

