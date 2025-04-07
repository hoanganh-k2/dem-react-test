import React from "react";

class DisplayInfor extends React.Component {
    render() {
        // destructuring array
        const { listUser } = this.props;

        return (
            <div>
                {listUser.map((user) => {
                    return (
                        <div key={user.id}>
                            My name is {user.name} <br />
                            My age is {user.age} <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default DisplayInfor;
