import React from "react";

class Nav extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleRequestWeather}>GetWeather</button>
                <button onClick={this.props.handleGetMovies}>The City in Films</button>
            </div>
        )
    }
}

export default Nav;

