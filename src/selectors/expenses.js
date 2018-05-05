
export default (expenses,{text,sortBy,startDate,endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = startDate ? startDate.isSameOrBefore(expense.timestamp,"day") : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(expense.timestamp,"day") : true;
        const textMatch = typeof text !== "string" || (
            (!!expense.desc && expense.desc.toLowerCase().includes(text.toLowerCase())) ||
            (!!expense.note && expense.note.toLowerCase().includes(text.toLowerCase()))
        ) ;
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if(sortBy === "amount"){
            return b.amount - a.amount;
        }
        else{
            return a.timestamp > b.timestamp ? -1 : 1 ;
        }
    });
};