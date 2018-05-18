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

        database.ref("expenses").push(expense)
        .then((childRef) => {
            dispatch(addExpense({
                id : childRef.key,
                ...expense
            }))
        })
    }
};


export const removeExpense = ( id ) => ({
    type : "REMOVE_EXPENSE",
    id
});


export const editExpense = (id,updates = {}) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});