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
                <div className="page-header">
                    <div className="content-container">
                        <div className="page-header__content">
                            <p className="page-header__title">Add Expense</p>
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onSubmit={this.onSubmit}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addExpenseDispatcher : (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined,mapDispatchToProps)(AddExpensePage);