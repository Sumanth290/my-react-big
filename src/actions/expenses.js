import database from "../firebase/firebase";

export const addExpense = ( expense ) => ({
    type : "ADD_EXPENSE",
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            desc = "",
            note = "",
            amount = 0,
            timestamp = 0
        } = expenseData ;

        const expense = {desc, note,amount,timestamp};

        return database.ref("expenses").push(expense)
        .then((childRef) => {
            dispatch(addExpense({
                id : childRef.key,
                ...expense
            }));
        })
    };
};


export const removeExpense = ( id ) => ({
    type : "REMOVE_EXPENSE",
    id
});

export const startRemoveExpense = (id) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense(id));
        });
    };
};


export const editExpense = (id,updates = {}) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

export const setExpenses = ( expenses ) => ({
    type: "SET_EXPENSES",
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref("expenses").once("value").then( (snapshot) => {
            const expenses = [];
            snapshot.forEach((child) => {
                expenses.push({
                    id : child.key,
                    ...child.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};