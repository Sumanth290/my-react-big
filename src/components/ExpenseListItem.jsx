import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";


export const ExpenseListItem =  ({desc,note,amount,timestamp,id}) => (
    <div>
        <h3>Description : <Link to={`/edit/${id}`}>{desc}</Link></h3>
        { note && <p>Note : {note}</p> }
        <p>Amount : {amount} &cent;</p>
        <p>Date : {moment(timestamp).format("MMM DD, Y")}</p>
    </div>
);

export default ExpenseListItem;
