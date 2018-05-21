import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import AppRouter from "./routers/AppRouter.jsx";
import "normalize.css/normalize.css";
import "./styles/myCSS.scss";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from "./firebase/firebase";

const store = configureStore();

const main = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>,document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(main,document.getElementById("app"));
});

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        console.log("logged in");
    }else{
        console.log("logged out");
    }
});


