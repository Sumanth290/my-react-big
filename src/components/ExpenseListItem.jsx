import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import myFormat from "../util/amtFormatter";

export const ExpenseListItem =  ({desc,note,amount,timestamp,id}) => (
    <Link className="list-item" to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{desc}</h3>
            <p className="list-item__sub-title">{moment(timestamp).format("MMM DD, Y")}</p>
        </div>
        <div>
            <h3 className="list-item__data">₹{myFormat(amount/100)}</h3>
        </div>
    </Link>
);


export default ExpenseListItem;
