import React from "react";

class MyComponent extends React.Component {
    state = {
        name: "Hoi Dan IT",
        address: "Ha Noi",
        age: 22,
    };

    handleOnClick = (event) => {
        console.log(">> click me", this.state.name);
        this.setState({
            name: "Hoang Anh",
            age: Math.floor(Math.random() * 100 + 1),
        });
    };

    handleOnMouseOver = (event) => {
        console.log(event.pageX);
    };

    render() {
        return (
            <div>
                My name is {this.state.name} and from {this.state.address}
                <button
                    onClick={(event) => {
                        this.handleOnClick(event);
                    }}
                >
                    Click me!
                </button>
                <button
                    onMouseOver={(event) => {
                        this.handleOnMouseOver(event);
                    }}
                >
                    Hover me!
                </button>
            </div>
        );
    }
}

export default MyComponent;
