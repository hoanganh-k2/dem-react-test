import React from "react";

class AddUserInfor extends React.Component {
    state = {
        name: "Hoi Dan IT",
        address: "Ha Noi",
        age: 22,
    };

    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value,
        });
    };

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.addUser({
            id: Math.floor(Math.random() * 100) + 1 + "-random",
            name: this.state.name,
            age: this.state.age,
        });
    };

    render() {
        return (
            <div>
                My name is {this.state.name} and from {this.state.address}
                <form onSubmit={(event) => this.handleOnSubmit(event)}>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={(event) => this.handleOnChangeInput(event)}
                    />
                    <input
                        value={this.state.age}
                        type="text"
                        onChange={(event) => this.handleOnChangeAge(event)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddUserInfor;
