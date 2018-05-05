import {createStore} from "redux";

const countReducer = (state = { count : 8 },action) => {
    switch (action.type) {
        case "INCREMENT" :
        const incVal = (typeof action.incrementBy === "number") ? action.incrementBy : 1 ;
            return {
                count : state.count + incVal
            };
        case "DECREMENT" :
            const decVal = (typeof action.decrementBy === "number") ? action.decrementBy : 1 ;
            return {
                count : state.count - decVal
            };
        case "RESET" :
            return {
                count : 0
            };
        case "SET" :
            return {
                count : action.setTo
            };
        default : return state;
    }
    return state;
};

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState());
});

const incrementBy = ({incrementBy = 1} = {}) => ({
    type : "INCREMENT",
    incrementBy
})

const decrementBy = ({decrementBy = 1} = {}) => ({
    type : "DECREMENT",
    decrementBy
})

const reset = () => ({
    type : "RESET"
})

const setTo = ({setTo = 1} = {}) => ({
    type : "SET",
    setTo
})

store.dispatch(incrementBy());

store.dispatch(incrementBy({incrementBy : 5}));

store.dispatch(decrementBy());

store.dispatch(decrementBy({decrementBy : 8}));

store.dispatch(reset());

store.dispatch(setTo({setTo:18}));