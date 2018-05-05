import React from "react";
import {shallow} from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("Should render ExpenseForm with expense",()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseForm",()=>{
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test("Should render error for ExpenseForm",()=>{
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("button").simulate('click');
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("Should set description on input change",() => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "New Desc";
    wrapper.find("input").at(0).simulate("change",{
        target : { value }
    });
    expect(wrapper.state("desc")).toBe(value);
});

test("Should set note on textarea change",() => {
    const wrapper = shallow(<ExpenseForm />);
    const note = "New Note";
    wrapper.find("textarea").simulate("change",{
        target : { value : note }
    });
    expect(wrapper.state("note")).toBe(note);
});

test("Should set amount if valid input",() => {
    const wrapper = shallow(<ExpenseForm />);
    const amount = "23.50";
    wrapper.find("input").at(1).simulate("change",{
        target : { value : amount }
    });
    expect(wrapper.state("amount")).toBe(amount);
});

test("Should set amount if invalid input",() => {
    const wrapper = shallow(<ExpenseForm />);
    const amount = "23.504";
    wrapper.find("input").at(1).simulate("change",{
        target : { value : amount }
    });
    expect(wrapper.state("amount")).toBe("");
});


test("Should call onClick for valid form submission",()=>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find("button").simulate('click');
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        desc : expenses[0].desc,
        note : expenses[0].note,
        amount : expenses[0].amount ,
        timestamp : expenses[0].timestamp.valueOf()
    });
});


test("Should set new date on date Change",()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
    expect(wrapper.state("timestamp")).toEqual(now);
});


test("Should set focus on focus Change",()=>{
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({focused:true});
    expect(wrapper.state("calendarFocused")).toBe(true);
});