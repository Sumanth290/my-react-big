import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login,logout,initialPath,resetInitPath,setInitPath } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
import AppRouter,{history} from "./routers/AppRouter.jsx";
import {firebase} from "./firebase/firebase";
import "normalize.css/normalize.css";
import "./styles/myCSS.scss";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const main = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>,document.getElementById("app"));

setInitPath(history.location.pathname);

let isRendered = false;

const renderApp = () => {
    if(!isRendered){
        ReactDOM.render(main,document.getElementById("app"));
        isRendered = true;
    }
};

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        console.log("uid",user.uid);
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(initialPath === "/"){
                history.push("/dashboard");
            }else {
                history.push(initialPath);
            }
        });
    }else{
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});


