import './App.css';
import React from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Weather from './components/Weather';
import Film from './components/Film';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: null,
      error: false,
      errorMessage: "",
      bErrorMessage: "",
      showWeather: "",
      weatherData: null,
      searchQuery: "",
      movies: [],
      showMovies: false
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value,
      error: false,
      bError: false,
    })
  }

  // handleSubmit = async (e) => { //old weather
  //   e.preventDefault();
  //   try {
  //     let url = `${process.env.REACT_APP_SERVER}/weather?name=${this.state.city}`
  //     console.log("hey", url);
  //     let weatherData = await axios.get(url);

  //     // console.log(weatherData.data);
  //     this.setState({
  //       weatherData: weatherData.data,
  //       showWeather: true
  //     })
  //   } catch (bError) {
  //     this.setState({
  //       bError: true,
  //       bErrorMessage: bError.message,
  //       error: ""
  //     })
  //   }
  // }

  getCityData = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
    console.log(url);
    try {
      let cityData = await axios.get(url);
      // console.log(cityData.data[0]);
      this.setState({ cityData: cityData.data[0] })
    } catch (error) {
      // console.log(error);
      this.setState({
        error: true,
        cityData: null,
        errorMessage: error.message
      })
    }
  }

  handleRequestWeather = async (event) => {
    event.preventDefault();
    try {
      const server = process.env.REACT_APP_SERVER;
      const url = `${server}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
      const response = await axios.get(url);
      // const response = await axios.get(url, { params: { searchQuery: this.state.cityData.lat+","+this.state.cityData.lon }});
      console.log("weather", response);
      this.setState({ showWeather: true, weatherData: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  handleGetMovies = async (event) => {
    event.preventDefault();
    try {
      const server = process.env.REACT_APP_SERVER;
      const url = `${server}/movies?city=${this.state.city}`;
      console.log(url)
      const response = await axios.get(url);
      console.log(response)
      // const response = await axios.get(url, { params: { searchQuery: this.state.cityData.lat+","+this.state.cityData.lon }});
      console.log("movies", response);
      this.setState({ showMovies: true, movies: response.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const truncTo3 = (num) => {
      num = Math.floor(num * 100) / 100;
      return num.toFixed(3)
    }

    return (
      <div className="App">

        <div style={{ width: "33%", textAlign: "center", margin: "auto", padding: "20px" }}>
          <Form >
            <Form.Control size="sm" placeholder="city name" onInput={this.handleInput} />
            <Button style={{ margin: "10px" }} type="submit" onClick={this.getCityData}>Explore</Button>
            {/* type "submit" enables enter key */}
          </Form>
        </div>
        <div className="overflow-auto" >
          {this.state.movies.length > 0 && this.state.movies.map(m => 
            <Film title={m.title} poster_path={m.poster_path}/>
            )}
        </div>


        {this.state.error
          ?
          <p>{this.state.errorMessage}</p>
          :
          <div>
            {this.state.cityData && <Card style={{ width: "24rem", margin: "auto" }}>
              <button onClick={this.handleRequestWeather}>GetWeather</button>
              <Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=12&size=600x600`} />
              <Card.Body>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Text>{truncTo3(this.state.cityData.lat)} {truncTo3(this.state.cityData.lon)}</Card.Text>
              </Card.Body>
              <button onClick={this.handleGetMovies}>The City in Films</button>
            </Card>
            }
          </div>
        }
        {this.state.bError
          ?
          <p style={{ color: "red" }}><em>server says: {this.state.bErrorMessage}</em></p>
          :
          this.state.showWeather
          && this.state.weatherData.map((d, idx) =>
            <Weather key={idx}
              date={d.date}
              description={d.description}
              high_temp={d.high_temp}
            />)
        }
      </div>
    );

  }
}

export default App;

