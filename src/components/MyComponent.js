import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: "Hoang Anh", age: 30 },
            { id: 2, name: "Anh", age: 26 },
            { id: 3, name: "Hoang", age: 23 },
        ],
    };
    render() {
        return (
            <div>
                <UserInfor></UserInfor>
                <br></br>
                <br />
                <DisplayInfor listUser={this.state.listUser}></DisplayInfor>
            </div>
        );
    }
}

export default MyComponent;
