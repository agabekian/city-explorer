import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Weather from './WeatherDay';
import Film from './Movie';
import Location from './Location';
import Nav from './Nav';
import axios from "axios";
import './Main.css'
import { CloudRain, Sun, Cloud } from 'react-bootstrap-icons';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            show: false,
            cityData: null,
            error: false,
            errorMessage: "",
            bError: false,
            bErrorMessage: "",
            // showWeather: "", //prolly not needed
            // showMovies: false
            weatherData: [],
            movies: [],
            searchQuery: "",
        }
    }

    chose = (param) => {
        if (param.includes("rain")) {
            return <CloudRain />
        }
        else if (param.includes("cloud")) {
            return <Cloud />
        }
        else return <Sun />
    }

    handleInput = (e) => {
        e.preventDefault();
        this.setState({
            city: e.target.value,
            error: false,
            bError: false,
        })
    }

    getCityData = async (e) => {
        e.preventDefault();
        let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
        console.log(url);
        try {
            let cityData = await axios.get(url);
            // console.log(cityData.data[0]);
            this.setState({ cityData: cityData.data[0], show: true })

        } catch (error) {
            this.setState({
                error: true,
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
            this.setState({
                bError: true,
                bErrorMessage: err.message
            })
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
            this.setState({
                bError: true,
                bErrorMessage: err.message
            })
            console.log(err);
        }
    }
    render() {
        return (
            <Container fluid className="left" style={{ paddingTop: "20px" }}>
                <div style={{ width: "33%", textAlign: "center", margin: "auto" }}>
                    <Form >
                        <Form.Control size="sm" placeholder="city name" onInput={this.handleInput} />
                        <Button variant="outline-light" style={{ margin: "10px" }} type="submit" onClick={this.getCityData}>Explore</Button>
                        {/* type "submit" enables enter key */}
                    </Form>
                    {this.state.cityData &&
                        <Nav
                            handleRequestWeather={this.handleRequestWeather}
                            handleGetMovies={this.handleGetMovies}
                        />
                    }
                </div>
                <Row>
                    <Col >
                        {this.state.error ?
                            <p>{this.state.errorMessage}</p>
                            : this.state.cityData &&
                            <Location
                                cityData={this.state.cityData}
                                getCity={this.getCityData}
                            />
                        }
                    </Col>

                    <Col >
                        {
                            this.state.bError
                                ?
                                <p style={{ color: "red" }}><em>server says: {this.state.bErrorMessage}</em></p>
                                :
                                <Weather
                                    weatherData={this.state.weatherData}
                                    chose={this.chose}
                                />
                        }
                    </Col>
                    <Col>
                        <Film movies={this.state.movies} />
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default Main;

