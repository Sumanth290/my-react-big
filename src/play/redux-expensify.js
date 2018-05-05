import {createStore, combineReducers} from "redux";
import uuid from "uuid";

const defExpensesState = [];
const defFiltersState = {
    text : "",
    sortBy : "date",
    startDate : undefined,
    endDate : undefined
};

const expensesReducer = (state = defExpensesState,action) => {
    switch(action.type){
        case "ADD_EXPENSE" :
            return [...state,action.expense];
        case "REMOVE_EXPENSE" :
            return state.filter(({id}) => action.id !== id ) ;
        case "EDIT_EXPENSE" :
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {...expense,...action.updates};
                }
                else{
                    return expense;
                }
            });
        default : 
            return state;
    }
}

const filtersReducer = (state = defFiltersState,action) => {
    switch(action.type){
        case "SET_TEXT" :
            return {...state,text : action.text};
        case "SORT_BY_AMOUNT" :
            return {...state,sortBy:"amount"};
        case "SORT_BY_DATE" :
            return {...state,sortBy:"date"}
        case "SET_START_DATE" :
            return {...state,startDate:action.startDate};
        case "SET_END_DATE" :
            return {...state,endDate:action.endDate};
        default : 
            return state;
    }
}

const store = createStore(
    combineReducers({
        expenses : expensesReducer,
        filters : filtersReducer
    })
);

const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== "number" || expense.timestamp >= startDate;
        const endDateMatch = typeof endDate !== "number" || expense.timestamp <= endDate;
        const textMatch = typeof text !== "string" || (
            (!!expense.desc && expense.desc.toLowerCase().includes(text.toLowerCase())) ||
            (!!expense.note && expense.note.toLowerCase().includes(text.toLowerCase()))
        ) ;
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === "date"){
            return a.timestamp > b.timestamp ? -1 : 1 ;
        }
        else if(sortBy === "amount"){
            return b.amount - a.amount;
        }
        else{
            return a.timestamp > b.timestamp ? -1 : 1 ;
        }
    });
};

store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses,state.filters));
});

const addExpense = ( {
    desc = "",
    note = "",
    amount = 0,
    timestamp = 0
} = {} ) => ({
    type : "ADD_EXPENSE",
    expense : {
        id : uuid(),
        desc,
        note,
        amount,
        timestamp
    }
});

const expenseOne = store.dispatch(addExpense({
    desc : "Rent",
    amount: 100
}));

const expenseTwo = store.dispatch(addExpense({
    desc : "Coffee",
    amount : 300,
    note : "Power Star Pawan Kalyan",
    timestamp : 1300
}));

const removeExpense = ( { id } = {} ) => ({
    type : "REMOVE_EXPENSE",
    id
});

store.dispatch(removeExpense({id:expenseOne.expense.id}));

const expenseThree = store.dispatch(addExpense({
    desc : "H.E.B",
    amount : 1200,
    note : "Sunrisers Hyderabad",
    timestamp : 1000
}));

const expenseFour = store.dispatch(addExpense({
    amount : 1201,
    timestamp : 1001
}));

const editExpense = (id,updates = {}) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

store.dispatch(editExpense(expenseThree.expense.id,{
    // desc : "CostCo Shopping",
    // note : "Need to spend less",
    amount : 43876,
    // timestamp : 0
}));

const setTextFilter = (text = "") => ({
    type: "SET_TEXT",
    text
});

// store.dispatch(setTextFilter('sers h'));

const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

const sortBydate = () => ({
    type: "SORT_BY_DATE"
});

store.dispatch(sortByAmount());
// store.dispatch(sortBydate());

const setStartDate = (startDate) => ({
    type : "SET_START_DATE",
    startDate
});

const setEndDate = (endDate) => ({
    type : "SET_END_DATE",
    endDate
});

store.dispatch(setStartDate(125));
store.dispatch(setEndDate(1500));

// const defaultState = {
//     expenses : [{
//         id : "defaultId",
//         desc : "CostCo Shopping",
//         note : "Need to spend less",
//         amount : 43876,
//         timestamp : 0
//     }],
//     filters : {
//         text : "rent",
//         sortBy : "amount",
//         startDate : undefined,
//         endDate : undefined
//     }
// };
