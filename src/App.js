// import './App.css';
import React from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: null,
      error: false,
      errorMessage: ""
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    // console.log(url);
    try {
      let cityData = await axios.get(url);
      console.log(cityData.data[0]);
      this.setState({ cityData: cityData.data[0] })
    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }


  render() {
    return (
      <div className="App">
      <div style={{width:"33%",textAlign:"center",margin:"auto",padding:"20px"}}>
        <Form onSubmit={this.getCityData}>
          <Form.Control size="sm" placeholder = "city name" onInput={this.handleInput} />
          <Button style={{margin:"20px"}}>Explore</Button>
        </Form>
      </div>
        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <div >
            {/* <img src="src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10&size=300x300`} />" */}
            {this.state.cityData && <Card style={{ width: "24rem",margin:"auto" }}>
              <Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=600x600`} />
              <Card.Body>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
                <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
              </Card.Body>
            </Card>
            }

          </div>
        }
      </div>
    );

  }
}

export default App;
