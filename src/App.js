import './App.css';
import React from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Weather from './components/Weather';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: null,
      error: false,
      errorMessage: "",
      showWeather: false,
      weatherData: null
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    let url = `${process.env.REACT_APP_SERVER}/weather?name=${this.state.city}`
    console.log("hey", url);
    let weatherData = await axios.get(url);

    // console.log(weatherData.data);
    this.setState({
      weatherData: weatherData.data,
      showWeather: true
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    // console.log(url);
    try {
      let cityData = await axios.get(url);
      // console.log(cityData.data[0]);
      this.setState({ cityData: cityData.data[0] })
    } catch (error) {
      // console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div style={{ width: "33%", textAlign: "center", margin: "auto", padding: "20px" }}>
          <Form >
            <Form.Control size="sm" placeholder="city name" onInput={this.handleInput} />
            <Button onClick={this.getCityData}>Explore</Button>
          </Form>

        </div>
        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <div >

            {this.state.cityData && <Card style={{ width: "24rem", margin: "auto" }}>
              <button onClick={this.handleSubmit}>GetWeather</button>
              <Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=600x600`} />
              <Card.Body>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Text>Longitude: {this.state.cityData.lon}</Card.Text>
                <Card.Text>Latitude: {this.state.cityData.lat}</Card.Text>
              </Card.Body>
            </Card>
            }
            {this.state.showWeather
          && this.state.weatherData.map((d,idx) => 
            <Weather key={idx}
            description={d.description}
            date={d.date}
          />)
        }

          </div>
        }
      </div>
    );

  }
}

export default App;

// constructor(props) {
//   super(props);
//   this.state = {
//     species: '',
//     petData: {},
//     showPet: false
//   }
// }

// handleInput = (e) => {
//   this.setState({
//     species: e.target.value
//   });
// }

// handleSubmit = async (e) => {
//   e.preventDefault();

//   let url = `${process.env.REACT_APP_SERVER}/pet?species=${this.state.species}`
//   let petData = await axios.get(url);

//   // console.log(petData.data);
//   this.setState({
//     petData: petData.data,
//     showPet: true
//   })
// }


// render() {
//   return (
//     <>
//       <h1>Find Your Pet</h1>
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Search
//           <input type="text" onInput={this.handleInput}/>
//         </label>
//         <button type="submit">Display Pet</button>
//       </form>
//       {
//         this.state.showPet &&
//         <p>{this.state.petData.name} is a {this.state.petData.breed}</p>
//       }
//     </>
//   )
// }
// }

// export default App;

