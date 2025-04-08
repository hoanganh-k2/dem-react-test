import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
    state = {
        isShowList: true,
    };

    handleShowHide = () => {
        this.setState({
            isShowList: !this.state.isShowList,
        });
    };
    render() {
        // destructuring array/object
        const { listUser } = this.props;

        return (
            <div className="display-infor-container">
                {/* <img src={logo} /> */}
                <div>
                    <span onClick={this.handleShowHide}>
                        {this.state.isShowList === true
                            ? "Hide user list"
                            : "Show user list"}
                    </span>
                </div>
                {this.state.isShowList && (
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
                                                this.props.handleDeleteUser(
                                                    user.id
                                                )
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
    }
}

export default DisplayInfor;
