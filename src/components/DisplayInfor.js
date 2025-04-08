import React from "react";
import "./DisplayInfor.scss";

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
        // destructuring array
        const { listUser } = this.props;

        return (
            <div className="display-infor-container">
                <div>
                    <span onClick={this.handleShowHide}>
                        {this.state.isShowList === true
                            ? "Hide user list"
                            : "Show user list"}
                    </span>
                </div>
                {this.state.isShowList && (
                    <div>
                        {listUser.map((user) => {
                            return (
                                <div
                                    key={user.id}
                                    className={+user.age > 18 ? "red" : "green"}
                                >
                                    My name is {user.name} <br />
                                    My age is {user.age} <br />
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

export default DisplayInfor;
