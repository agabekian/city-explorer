import React from "react";
import Card from 'react-bootstrap/Card';


class Weather extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <Card.Img />
          <Card.Body>
            <Card.Title>{this.props.date}</Card.Title>
            <Card.Text>{this.props.description}</Card.Text>
            <Card.Text>{this.props.high_temp}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Weather;

