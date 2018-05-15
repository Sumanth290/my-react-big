import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 for no expenses",() => {
    expect(getExpensesTotal([])).toBe(0);
});

test("should return amount of single expense",() => {
    expect(getExpensesTotal([expenses[1]])).toBe(expenses[1].amount);
});

test("should return amount of multiple expenses",() => {
    expect(getExpensesTotal(expenses)).toBe(114134);
});