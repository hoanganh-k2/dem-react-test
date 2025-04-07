import React from "react";

class DisplayInfor extends React.Component {
    render() {
        //destructuring array
        const { name, age } = this.props;
        //props = properties
        return (
            <div>
                My name is {name} <br />
                My age is {age} <br />
            </div>
        );
    }
}

export default DisplayInfor;
