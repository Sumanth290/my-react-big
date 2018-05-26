import React from "react";
import {Router,Route,Switch} from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage.jsx";
import AddExpensePage from "../components/AddExpensePage.jsx";
import EditExpensePage from "../components/EditExpensePage.jsx";
import HelpPage from "../components/HelpPage.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import LoginPage from "../components/LoginPage.jsx";
import PrivateRoute from "../routers/PrivateRoute.jsx";

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
                <PrivateRoute path="/create" component={AddExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/> 
                <Route component={ErrorPage}/>   
            </Switch>
        </div>
    </Router>
);

export default AppRouter;