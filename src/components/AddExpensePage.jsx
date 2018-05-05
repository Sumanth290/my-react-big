import React from "react";
import ExpenseForm from "./ExpenseForm.jsx";
import { connect } from "react-redux";
import {addExpense} from "../actions/expenses";

export class AddExpensePage extends React.Component{
    onSubmit = (expense) => {
        this.props.addExpenseDispatcher(expense);
        this.props.history.push("/");
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
    addExpenseDispatcher : (expense) => dispatch(addExpense(expense))
})

export default connect(undefined,mapDispatchToProps)(AddExpensePage);