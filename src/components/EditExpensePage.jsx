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
                <div className="page-header">
                    <div className="content-container">
                        <div className="page-header__content">
                            <p className="page-header__title">Edit Expense</p>
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.handleOnSubmit}
                    />
                    <button className="buttons buttons--remove" onClick={this.handleRemove}>Remove Expense</button>
                </div>
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