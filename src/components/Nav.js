import React from "react";
import Button from 'react-bootstrap/Button';

class Nav extends React.Component {
    render() {
        return (
            <div>
                <Button variant="outline-warning" onClick={this.props.handleRequestWeather} style={{margin:"10px"}} >GetWeather</Button>
                <Button variant="outline-warning" onClick={this.props.handleGetMovies} style={{margin:"10px"}} >The City in Films</Button>
            </div>
        )
    }
}

export default Nav;

