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

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <div>
                My name is {this.state.name} and from {this.state.address}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default MyComponent;
