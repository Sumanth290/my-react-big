import moment from "moment";

export default [{
    id : "1",
    desc : "gum",
    note: "",
    amount: 134,
    timestamp : moment(0)
}, {
    id : "2",
    desc : "rent",
    note: "",
    amount: 109500,
    timestamp : moment(0).subtract(4,"days")
}, {
    id : "3",
    desc : "Credit Card",
    note: "",
    amount: 4500,
    timestamp : moment(0).add(4,"days")
}];