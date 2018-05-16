import React from "react";
import ExpenseList from "./ExpenseList.jsx";
import ExpenseListFilters from "./ExpenseListFilters.jsx";
import ExpenseSummary from "./ExpenseSummary.jsx";


const ExpenseDashboardPage = () => (
    <div>
        <h2>This is "Expense Dashboard Home Page"</h2>
        <ExpenseSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;