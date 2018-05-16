import React from "react";
import {shallow} from "enzyme";
import {ExpenseSummary} from "../../components/ExpenseSummary.jsx";

test("Should render expense Summary for one expense",()=>{
    const wrapper = shallow(<ExpenseSummary count={1} total={234.54}/>)
    expect(wrapper).toMatchSnapshot();
});

test("Should render expense Summary for multiple expenses",()=>{
    const wrapper = shallow(<ExpenseSummary count={5} total={23453245.54}/>)
    expect(wrapper).toMatchSnapshot();
});