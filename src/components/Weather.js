import React from "react";
import Card from 'react-bootstrap/Card';
import {CloudRain,Sun,Cloud} from 'react-bootstrap-icons';


class Weather extends React.Component {

  
  render() {
    return (
      <div>
        <Card border="light" bg={"secondary"} text={"light"}>
          <Card.Img />
          <Card.Body>
           {this.props.chose(this.props.description)}
            <Card.Title text={"dark"}>{this.props.date}</Card.Title>
            <Card.Text>{this.props.description}</Card.Text>
            <Card.Text>{this.props.high_temp}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Weather;

