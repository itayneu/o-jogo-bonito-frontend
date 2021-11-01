import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navBar";

class AboutUs extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar currentPage="aboutUs" />
        <div className="container" style={{color: "white"}}>
          <div
            style={{
              marginLeft: "1.3%",
              marginTop: "10%"
            }}
          >
            <h3 className="display-4">
              <b>About Us</b>
            </h3>
          </div>
          <div
            style={{
              marginLeft: "1.3%",
              marginBottom: "0.4%",
              marginTop: "0.2%",
              fontSize: "20px"
            }}
          >
            {" "}
            <b>O Jogo Bonito</b> means the beautiful game in Portuguese.
            <br />
            It is a nickname for football, the game we all love.
            <br />
            We play it, we watch it, we wear it.
            <br />
            <br />
            Our mission is to dress the world in beautiful and colorful football shirts.
            <br />
            Now it is possible to order your favourite team's shirt, 
            <br />
            or any other beautiful shirt,
            <br />
            directly from your home in few clicks.
          </div>
          <div style={{
              marginLeft: "1.3%",
              marginTop: "20px",
            }}>
          <Link
            className="btn btn-dark btn-sm"
            to="shop/products"
            role="button"
          >
            Shop now &raquo;
          </Link>
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutUs;
