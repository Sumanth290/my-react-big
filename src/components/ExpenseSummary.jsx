import React from "react";
import { connect } from "react-redux";
import getVisibleExpenses from "../selectors/expenses";
import getExpensesTotals from "../selectors/expenses-total";
import myFormat from "../util/amtFormatter";

export class ExpenseSummary extends React.Component {
    render(){
        return (
            <div>
                {this.props.count > 0 && (
                    this.props.count === 1 ? (
                        <p>{`Viewing 1 expense totalling ₹ ${myFormat(this.props.total)}`}</p>
                    ) : (
                        <p>{`Viewing ${this.props.count} expenses totalling ₹ ${myFormat(this.props.total)}`}</p>
                    )
                )}
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