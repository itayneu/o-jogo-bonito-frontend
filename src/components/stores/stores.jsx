import React, { Component } from "react";
import NavBar from "../navBar";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import "./stores.css";

class Stores extends Component {
    render() {
      return (
        <React.Fragment>
          <NavBar currentPage="stores" />
          <div className="container" style={{color: "white"}}>
            <div
              style={{
                marginLeft: "1.3%",
                marginTop: "10%",
              }}
            >
              <h3 className="display-4">
                <b>Our Stores</b>
              </h3>
            </div>
            <div id="div1"
              style={{
                marginLeft: "1.3%",
                marginBottom: "0.4%",
                marginTop: "0.2%",
                fontSize: "20px"
              }}
            >
              {" "}
              <b>Tel Aviv</b>
              <br />
              Dizengoff Square
              <br />
              Tel Aviv, Israel
              <br />
              <br />
              <u>Opening hours:</u>
              <br />
              Sun-Sat 10:00 - 19:00
              <br />
              <br />
              </div>
              <div id="div1"
              style={{
                marginLeft: "5%",
                marginBottom: "0.4%",
                marginTop: "0.2%",
                fontSize: "20px",
              }}
            >
              <b>Ramat Aviv</b>
              <br />
              Ramat Aviv Mall
              <br />
              Tel Aviv, Israel
              <br />
              <br />
              <u>Opening hours:</u>
              <br />
              Sun-Thu 10:00 - 22:00
              <br />
              Fri 10:00 - 15:00
              <br />
            </div>
            <div id="div1"
              style={{
                marginLeft: "5%",
                marginBottom: "0.4%",
                marginTop: "0.2%",
                fontSize: "20px",
              }}
            >
              <b>Ramat Gan</b>
              <br />
              Ayalon Mall
              <br />
              Ramat Gan, Israel
              <br />
              <br />
              <u>Opening hours:</u>
              <br />
              Sun-Thu 10:00 - 21:00
              <br />
              Fri 10:00 - 15:00
              <br />
            </div>
            
            <div
              style={{
                marginLeft: "1.3%",
                marginBottom: "0.4%",
                marginTop: "0.2%",
                fontSize: "20px",
              }}
            >
              <Map 
                  google={this.props.google}
                  style={{width: '50%', height: '50%', position: 'relative'}}
                  zoom={13}
                  initialCenter={{ lat: 32.101044, lng: 34.803272}}
              >
                <Marker position={{ lat: 32.07788, lng: 34.77417}} title={'Tel Aviv'}/>
                <Marker position={{ lat: 32.112141, lng: 34.795755}} title={'Ramat Aviv'} />
                <Marker position={{ lat: 32.100354, lng: 34.826715}} title={'Ramat Gan'}/>
              </Map>
            </div>
            
          </div>
        </React.Fragment>
      );
    }
  }

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBAWqR4UpLa3d2YSPdESkbPJx2SRjWWaG8'
  })(Stores);
