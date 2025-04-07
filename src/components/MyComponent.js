import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    render() {
        const myArr = ["aaaa", "bbbb", "cccc"];
        return (
            <div>
                <UserInfor></UserInfor>
                <br></br>
                <br />
                <DisplayInfor
                    name="Hoang anh"
                    age="40"
                    myArr={myArr}
                ></DisplayInfor>
                <DisplayInfor name="Anh" age="30"></DisplayInfor>
            </div>
        );
    }
}

export default MyComponent;
