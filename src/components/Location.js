import React from "react";
import { Card } from 'react-bootstrap';

class Location extends React.Component {
    render() {
        const truncTo3 = (num) => {
            num = Math.floor(num * 100) / 100;
            return num.toFixed(3)
        }
        return (
            <div>
                {this.props.show && <Card style={{ width: "24rem", margin: "auto" }}>
  
                    <><Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.cityData.lat},${this.props.cityData.lon}&zoom=12&size=600x600`} />
                        <Card.Body>
                            <Card.Title>{this.props.cityData.display_name}</Card.Title>
                            <p>{truncTo3(this.props.cityData.lat)} {truncTo3(this.props.cityData.lon)}</p>
                        </Card.Body></>
                </Card>
                }
            </div>
        )
    }
}

export default Location;

