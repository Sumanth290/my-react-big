import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm.jsx";
import {startEditExpense,startRemoveExpense} from "../actions/expenses";

export class EditExpensePage extends React.Component{
    handleOnSubmit = (expense) => {
        this.props.editExpenseDispatcher(this.props.expense.id,expense);
        this.props.history.push("/dashboard");
    };

    handleRemove = (e) => {
        if(confirm("Are you sure you want to remove expense ?")){
            this.props.removeExpenseDispatcher(this.props.expense.id);
            console.log("Removed !!");
            this.props.history.push("/dashboard");
        }
    };

    render(){
        return (
            <div>
                <h2>This is "Edit Expense Page"</h2>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.handleOnSubmit}
                />
                <button onClick={this.handleRemove}>Remove</button>
            </div>
        );
    }
}


const mapStatetoProps = (state,props) => ({
    expense : state.expenses.find((expense) => (expense.id === props.match.params.id))
});

const mapDispatchToProps = (dispatch) => ({
    editExpenseDispatcher : (id,expense) => dispatch(startEditExpense(id,expense)),
    removeExpenseDispatcher : (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStatetoProps,mapDispatchToProps)(EditExpensePage);