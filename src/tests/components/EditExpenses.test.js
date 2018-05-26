import React from "react";
import {shallow} from "enzyme";
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpenseDispatcher,removeExpenseDispatcher,history,wrapper;

beforeEach(() => {
    editExpenseDispatcher = jest.fn();
    removeExpenseDispatcher = jest.fn();
    history = {push : jest.fn()};
    wrapper = shallow(
        <EditExpensePage 
            editExpenseDispatcher={editExpenseDispatcher}
            removeExpenseDispatcher={removeExpenseDispatcher}
            history={history}
            expense={expenses[1]}
        />
    );
});

test("should render EditExpensePage", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith("/dashboard");
    expect(editExpenseDispatcher).toHaveBeenLastCalledWith(expenses[1].id,expenses[1]);
});

test("should handle onClick on remove button", () => {
    global.confirm = jest.fn(() => true);
    wrapper.find("button").simulate("click",{});
    expect(history.push).toHaveBeenLastCalledWith("/dashboard");
    expect(removeExpenseDispatcher).toHaveBeenLastCalledWith(expenses[1].id);
});