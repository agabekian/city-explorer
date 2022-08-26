import React from "react";
import {Card} from 'react-bootstrap';

class Film extends React.Component {
  render() {
    return (
        <Card border="white" bg={"primary"} text={"light"}>
          <Card.Img variant="bottom" />
          <Card.Body>
            <Card.Title><a style={{textDecoration:"none",color:"white"}} href={`//image.tmdb.org/t/p/original/${this.props.poster_path}`}>{this.props.title}</a></Card.Title>
            {/* {/* <Card.Text>{this.props.description}</Card.Text> */}
            
          </Card.Body>
        </Card>
  
    )
  }
}

export default Film;

