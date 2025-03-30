import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "Hoi Dan IT",
        address: "Ha Noi",
        age: 22,
    };
    render() {
        return (
            <div>
                My name is {this.state.name} and from {this.state.address}
            </div>
        );
    }
}

export default MyComponent;
