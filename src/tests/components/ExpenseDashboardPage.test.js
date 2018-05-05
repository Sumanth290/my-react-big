import React from "react";
import {shallow} from "enzyme";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";
import toJSON from "enzyme-to-json";


test("Should render ExpenseDashboardPage",()=>{
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});