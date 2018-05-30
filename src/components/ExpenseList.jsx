import React from "react";
import { connect } from "react-redux";
import getVisibleExpenses from "../selectors/expenses";
import ExpenseListItem from "./ExpenseListItem.jsx";

export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
        {   
                props.expenses && props.expenses.length !== 0 ? (
                    props.expenses.map((expense) => (
                        <ExpenseListItem key={expense.id} {...expense} />
                    ))
                ) : (
                    <div className="list-item list-item__message">
                        <span>No Expenses</span>
                    </div>
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    expenses : getVisibleExpenses(state.expenses,state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
