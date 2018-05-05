import React from "react";
import { connect } from "react-redux";
import getVisibleExpenses from "../selectors/expenses";
import ExpenseListItem from "./ExpenseListItem.jsx";

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses && props.expenses.length !== 0 ? (
                <ul>
                    {props.expenses.map((expense) => (
                        <li key={expense.id}><ExpenseListItem {...expense} /></li>
                    ))}
                </ul>
            ) : (
                <p>No Expenses</p>
            )
        }
    </div>
);

const mapStateToProps = (state) => ({
    expenses : getVisibleExpenses(state.expenses,state.filters)
});

export default connect(mapStateToProps)(ExpenseList);
