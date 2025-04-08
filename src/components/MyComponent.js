import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
    state = {
        listUser: [
            { id: 1, name: "Hoang Anh", age: 13 },
            { id: 2, name: "Anh", age: 26 },
            { id: 3, name: "Hoang", age: 23 },
        ],
    };
    addUser = (arrObj) => {
        this.setState({
            listUser: [arrObj, ...this.state.listUser],
        });
    };

    render() {
        return (
            <>
                <div className="a">
                    <AddUserInfor addUser={this.addUser}></AddUserInfor>
                    <br></br>
                    <br />
                    <DisplayInfor listUser={this.state.listUser}></DisplayInfor>
                </div>
                <div className="b"></div>
            </>
        );
    }
}

export default MyComponent;
