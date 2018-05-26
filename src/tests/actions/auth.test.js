import {login,logout} from "../../actions/auth";

test("Should test login action",() => {
    expect(login("dzxsxgdg")).toEqual({
        type:"LOGIN",
        uid : "dzxsxgdg"
    });
});

test("Should test logout action",() => {
    expect(logout()).toEqual({
        type:"LOGOUT"
    });
});