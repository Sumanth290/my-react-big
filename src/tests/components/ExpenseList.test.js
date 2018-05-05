import React from "react";
import {shallow} from "enzyme";
import {ExpenseList} from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("Should render expenseList with expenses",()=>{
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render no expenses without expenses props",()=>{
    const wrapper = shallow(<ExpenseList />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render no expenses with empty expenses props",()=>{
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(wrapper).toMatchSnapshot();
});