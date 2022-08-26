import React from "react";
import { Card } from 'react-bootstrap';

class Film extends React.Component {
  render() {
    return (
      this.props.movies.length > 0 && this.props.movies.map((m, idx) =>
        <Card key={idx} border="white" bg={"primary"} text={"light"}>
          <Card.Img variant="bottom" />
          <Card.Body>
            <Card.Title><a style={{ textDecoration: "none", color: "white" }} href={`//image.tmdb.org/t/p/original/${m.poster_path}`}>{m.title}</a></Card.Title>
            {/* {/* <Card.Text>{this.props.description}</Card.Text> */}

          </Card.Body>
        </Card>
      )
    )
  }
}

export default Film;

