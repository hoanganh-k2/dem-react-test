import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
    constructor(props) {
        console.log(">>> call me constructor");
        super(props);
        this.state = {
            isShowList: true,
        };
    }

    componentDidMount() {
        console.log(">>> call me component did mount");
        setTimeout(() => {
            document.title = "Chicken 2k9";
        }, 3000);
    }

    componentDidUpdate(preProps, preState, snapshot) {
        console.log(">>> call me component did update", this.props, preProps);
        if (this.props.listUser !== preProps.listUser) {
            if (this.props.listUser.length === 5) {
                alert("we got 5 users");
            }
        }
    }

    handleShowHide = () => {
        this.setState({
            isShowList: !this.state.isShowList,
        });
    };
    render() {
        console.log(">>> call me render");
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
