import React from "react";
import ExpenseForm from "./ExpenseForm.jsx";
import { connect } from "react-redux";
import {startAddExpense} from "../actions/expenses";

export class AddExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.addExpenseDispatcher(expense);
        this.props.history.push("/dashboard");
    };

    render(){
        return (
            <div>
                <h2>This is "Add Expense Page"</h2>
                <ExpenseForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addExpenseDispatcher : (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined,mapDispatchToProps)(AddExpensePage);