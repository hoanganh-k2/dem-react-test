import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

const DisplayInfor = (props) => {
    // destructuring array/object
    const { listUser } = props;
    const [isShowListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowListUser);
    };

    console.log(">>> call me render");

    useEffect(() => {
        if (listUser.length === 0) {
            alert("You deleted all the user");
        }
        console.log(">>> call me useEffect");
    }, [listUser]);

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
