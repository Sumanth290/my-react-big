import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import myFormat from "../util/amtFormatter";

export const ExpenseListItem =  ({desc,note,amount,timestamp,id}) => (
    <div>
        <h3>Description : <Link to={`/edit/${id}`}>{desc}</Link></h3>
        { note && <p>Note : {note}</p> }
        {/* <p>Amount : {numeral(amount/100).format("$0,0.00")}</p> */}
        <p>Amount : ₹ {myFormat(amount/100)}</p>
        <p>Date : {moment(timestamp).format("MMM DD, Y")}</p>
    </div>
);


export default ExpenseListItem;
