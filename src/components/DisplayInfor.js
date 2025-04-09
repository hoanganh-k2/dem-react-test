import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

// class DisplayInfor extends React.Component {
// render() {
//     // destructuring array/object
//     const { listUser } = this.props;

//     return (
//         <div className="display-infor-container">
//             {/* <img src={logo} /> */}
//             <div>
//                 <span onClick={this.handleShowHide}>
//                     {this.state.isShowList === true
//                         ? "Hide user list"
//                         : "Show user list"}
//                 </span>
//             </div>
//             {this.state.isShowList && (
//                 <>
//                     {listUser.map((user) => {
//                         return (
//                             <div
//                                 key={user.id}
//                                 className={+user.age > 18 ? "red" : "green"}
//                             >
//                                 My name is {user.name} <br />
//                                 My age is {user.age} <br />
//                                 <div>
//                                     <button
//                                         onClick={() =>
//                                             this.props.handleDeleteUser(
//                                                 user.id
//                                             )
//                                         }
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                                 <hr />
//                             </div>
//                         );
//                     })}
//                 </>
//             )}
//         </div>
//     );
// }
// }

const DisplayInfor = (props) => {
    // destructuring array/object
    const { listUser } = props;
    const [isShowListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowListUser);
    };

    return (
        <div className="display-infor-container">
            <div>
                <span onClick={() => handleShowHideListUser()}>
                    {isShowListUser !== true
                        ? "Hide list user"
                        : "Show list user"}
                </span>
            </div>
            {isShowListUser && (
                <>
                    {listUser.map((user) => {
                        return (
                            <div
                                key={user.id}
                                className={+user.age > 18 ? "red" : "green"}
                            >
                                My name is {user.name} <br />
                                My age is {user.age} <br />
                                <div>
                                    <button
                                        onClick={() =>
                                            props.handleDeleteUser(user.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default DisplayInfor;
