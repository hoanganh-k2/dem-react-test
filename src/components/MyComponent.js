import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//     state = {
//         listUser: [
//             { id: 1, name: "Hoang Anh", age: 13 },
//             { id: 2, name: "Anh", age: 26 },
//             { id: 3, name: "Hoang", age: 23 },
//         ],
//     };
//     addUser = (arrObj) => {
//         this.setState({
//             listUser: [arrObj, ...this.state.listUser],
//         });
//     };

//     handleDeleteUser = (userId) => {
//         let listUser = this.state.listUser;
//         listUser = listUser.filter((item) => item.id !== userId);
//         this.setState({
//             listUser: listUser,
//         });
//     };

//     render() {
//         return (
//             <>
//                 <div className="a">
//                     <AddUserInfor addUser={this.addUser}></AddUserInfor>
//                     <br></br>
//                     <br />
//                     <DisplayInfor
//                         listUser={this.state.listUser}
//                         handleDeleteUser={this.handleDeleteUser}
//                     ></DisplayInfor>
//                 </div>
//                 <div className="b"></div>
//             </>
//         );
//     }
// }

const MyComponent = (props) => {
    const [listUser, setListUser] = useState([
        { id: 1, name: "Hoang Anh", age: 13 },
        { id: 2, name: "Anh", age: 26 },
        { id: 3, name: "Hoang", age: 23 },
    ]);

    const addUser = (arrObj) => {
        setListUser([arrObj, ...listUser]);
    };

    const handleDeleteUser = (userId) => {
        let updateList = listUser;
        updateList = updateList.filter((item) => item.id !== userId);
        setListUser(updateList);
    };

    return (
        <>
            <div className="a">
                <AddUserInfor addUser={addUser}></AddUserInfor>
                <br></br>
                <br />
                <DisplayInfor
                    listUser={listUser}
                    handleDeleteUser={handleDeleteUser}
                ></DisplayInfor>
            </div>
            <div className="b"></div>
        </>
    );
};

export default MyComponent;
