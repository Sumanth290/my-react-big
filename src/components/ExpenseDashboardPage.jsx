import React from "react";
import ExpenseList from "./ExpenseList.jsx";
import ExpenseListFilters from "./ExpenseListFilters.jsx";
import ExpenseSummary from "./ExpenseSummary.jsx";


const ExpenseDashboardPage = () => (
    <div>
        <ExpenseSummary />
        <ExpenseListFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;