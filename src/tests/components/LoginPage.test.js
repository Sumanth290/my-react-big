import React from "react";
import {shallow} from "enzyme";
import {LoginPage} from "../../components/LoginPage.jsx";

test("Should render Login Page correctly",()=>{
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});