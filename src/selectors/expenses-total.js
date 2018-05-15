
export default (expenses) => 
    (expenses && expenses.length > 0) ? (expenses.map((expense) => expense.amount).reduce((acc,cur) => acc+cur)) : 0 ;