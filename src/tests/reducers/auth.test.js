import authReducer from "../../reducers/auth";

test("Should test login action",() => {
    expect(authReducer({},{
        type: "LOGIN",
        uid : "dzxfsdgasg"
    })).toEqual({
        uid : "dzxfsdgasg"
    });
});

test("Should test logout action",() => {
    expect(authReducer({uid : "adgsdgdzgg"},{
        type: "LOGOUT"
    })).toEqual({});
});