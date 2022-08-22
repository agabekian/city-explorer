import React from "react";
import axios from "axios";

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        }
    }
    
    cityData = axios.get()

    handleInput = (e) => {
        this.setState({city: e.target.value})
    }

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="search">Search</label>
                    <input type="text" onInput={this.handleInput} id="search" />
                    <button onSubmit="handleSubmit">Explore</button>
                </form>
            </div>
        )
    }
}

export default City;