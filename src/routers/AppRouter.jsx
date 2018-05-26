import React from "react";
import {Router,Route,Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage.jsx";
import AddExpensePage from "../components/AddExpensePage.jsx";
import EditExpensePage from "../components/EditExpensePage.jsx";
import HelpPage from "../components/HelpPage.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import Header from "../components/Header.jsx";
import LoginPage from "../components/LoginPage.jsx";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <Route path="/dashboard" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/> 
                <Route component={ErrorPage}/>   
            </Switch>
        </div>
    </Router>
);

export default AppRouter;