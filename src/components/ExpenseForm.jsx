import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";


export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            desc : props.expense ? props.expense.desc : "",
            note : props.expense ? props.expense.note : "",
            amount : props.expense ? (props.expense.amount / 100).toString() :"",
            timestamp : props.expense ? moment(props.expense.timestamp) : moment(),
            calendarFocused : false,
            error : ""
        }
    }

    handleDescOnChange = (e) => {
        const desc = e.target.value;
        this.setState(() => ({ desc }));
    };

    handleNoteOnChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    handleAmtOnChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }));
        }
    };

    handleDateChange = (timestamp) => {
        if(timestamp){
            this.setState(() => ({ timestamp }));
        }
    };

    handleFocusChange = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused}));
    };

    handleAddExpenseButtonClick = (e) => {
        if(!this.state.desc || !this.state.amount)
        {
            this.setState(() => ({error : "Please provide 'Description' and 'Amount'"}));
        }
        else{
            this.setState(() => ({error : ""}));
            this.props.onSubmit({
                desc : this.state.desc,
                note : this.state.note,
                amount : parseFloat(this.state.amount,10) * 100 ,
                timestamp : this.state.timestamp.valueOf()
            });
            console.log("Submitted !!");
        }
    }

    render(){
        return (
            <div className="form">
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input 
                    className="text-input"
                    type="text" 
                    placeholder="Description" 
                    autoFocus 
                    value={this.state.desc}
                    onChange={this.handleDescOnChange}
                />
                <input 
                    className="text-input"
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.handleAmtOnChange}
                />
                <SingleDatePicker
                    date={this.state.timestamp} 
                    onDateChange={this.handleDateChange} 
                    focused={this.state.calendarFocused}
                    onFocusChange={this.handleFocusChange}
                    isOutsideRange={() => ( false )}
                    numberOfMonths={1}
                />
                <textarea
                    className="text-area"
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.handleNoteOnChange}
                ></textarea>
                <div>
                    <button className="buttons form_button" onClick={this.handleAddExpenseButtonClick}>Save Expense</button>
                </div>
            </div>
        );
    }
}