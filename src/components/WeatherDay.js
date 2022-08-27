import React from "react";
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {

  render() {
    return (
      this.props.weatherData.length>0 && this.props.weatherData.map((d, idx) =>
        <Card key={idx} border="light" bg={"secondary"} text={"light"}>
          <Card.Img />
          <Card.Body>
            {this.props.chose(d.description)}
            <Card.Title text={"dark"}>{d.date}</Card.Title>
            <Card.Text>{d.description}</Card.Text>
            <Card.Text>{d.high_temp}</Card.Text>
          </Card.Body>
        </Card>
      )
    )
  }
}

export default Weather;

