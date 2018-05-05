import React from "react";
import {shallow} from "enzyme";
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpenseDispatcher,history,wrapper;

beforeEach(() => {
    addExpenseDispatcher = jest.fn();
    history = {push : jest.fn()};
    wrapper = shallow(
        <AddExpensePage 
            addExpenseDispatcher={addExpenseDispatcher}
            history={history}
        />
    );
});

test("Should render AddExpensePage",() => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(addExpenseDispatcher).toHaveBeenLastCalledWith(expenses[1]);
});