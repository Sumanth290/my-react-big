import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotals from "../selectors/expenses-total";
import myFormat from "../util/amtFormatter";

export class ExpenseSummary extends React.Component {
   
    render(){
        const expenseWord = this.props.count === 1 ? "expense" : "expenses";
        
        return (
            <div className="page-header">
                <div className="content-container">
                    <div className="page-header__content">
                        <p className="page-header__title">
                            Viewing <span>{this.props.count}</span> {expenseWord} totalling <span>₹ {myFormat(this.props.total)}</span>
                        </p>
                        <div className="page-header__action">
                            <Link className="buttons" to="/create" >Create Expense</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    return ({
        count : visibleExpenses.length,
        total : getExpensesTotals(visibleExpenses)/100
    });
};


export default connect(mapStateToProps)(ExpenseSummary);