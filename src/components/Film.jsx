import React from "react";
import {Card} from 'react-bootstrap';



class Film extends React.Component {

  render() {
    return (
  
        <Card >
          <Card.Img variant="bottom" />
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            {/* {/* <Card.Text>{this.props.description}</Card.Text> */}
            {/* {let url= `https://image.tmdb.org/t/p/original/+${this.props.poster_path}`} */}
          </Card.Body>
        </Card>
  
    )
  }
}

export default Film;

