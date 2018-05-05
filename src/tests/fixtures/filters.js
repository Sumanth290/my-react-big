import moment from "moment";

export const defaultfilters = {
    text : "",
    sortBy : "date",
    startDate : undefined,
    endDate : undefined
};

export const altfilters = {
    text : "bills",
    sortBy : "amount",
    startDate : moment(0),
    endDate : moment(0).add(3,"days")
};