import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import configuration from "../services/configuration.json";


class NavBar extends Component {
  render() {
    let username = "";
    if (Cookies.get("oJogoBonito")) {
      username = JSON.parse(Cookies.get("oJogoBonito")).username;
      //if (JSON.parse(Cookies.get("oJogoBonito")).username == "admin")
//username = "admin";
    }
    let { currentPage } = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link
          className="navbar-brand"
          to="/aboutus"
          style={{
            color: "white",
            marginLeft: "2%",
            marginRight: "2%",
            paddingTop: "0.1%",
            fontSize: "26px",
            fontWeight: "bold",
            textAnchor: "middle",
            userSelect: "none",
          }}
        >
          <img src={`${configuration.imageData}/ojogobonito-long.png`} alt="" height="30" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li style={{ visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
                }`,
                marginRight: "15px" }} 
                className="nav-item active">
              <Link className="nav-link" to="/shop/products">
                {" "}
                <b> Our Shirts </b> <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              style={{ visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
                }`,
                marginLeft: "15px", 
                marginRight: "15px" }}
              className="nav-item active"
            >
              <Link className="nav-link" to="/print">
                {" "}
                <b> Personalized Print </b> <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              style={{ visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
                }`,
                marginLeft: "15px", 
                marginRight: "15px" }}
              className="nav-item active"
            >
              <Link className="nav-link" to="/stores">
                {" "}
                <b> Our Stores </b> <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              style={{ visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
                }`,
                marginLeft: "15px", 
                marginRight: "15px" }}
              className="nav-item active"
            >
              <Link className="nav-link" to="/aboutUs">
                {" "}
                <b> About Us </b> <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              style={{ visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
                }`,
                marginLeft: "15px", 
                marginRight: "15px" }}
              className="nav-item active"
            >
              <Link className="nav-link" to="/contactUs">
                {" "}
                <b> Contact Us </b> <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              style={{
                marginLeft: "15px",
                marginRight: "15px",
                visibility: `${
                  username === "admin" ? "visible" : "hidden"
                }`,
              }}
              className="nav-item active"
            >
              <Link className="nav-link" to="/admin">
                {" "}
                <b style={{ color:"yellowgreen" , fontWeight: "bold" }}>
                  {" "}
                  Admin{" "}
                </b>{" "}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li
              style={{ visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
                }`,
                marginLeft: "15px", 
                marginRight: "15px" }}
              className="nav-item active"
            >
              <Link className="nav-link" to="/contactUs">
                {" "}
                <b> Hello, {username} </b> <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <form
            className="form-inline my-2 my-lg-0"
            style={{
              visibility: `${
                currentPage === "login" || currentPage === "register"
                  ? "hidden"
                  : "visible"
              }`,
            }}
          >
            <Link
              className="nav-link"
              to="/shop/cart"
              style={{ color: "white" }}
            >
              <button
                className="btn btn-light"
                type="button"
                style={{ background: "#272744" }}
              >
                My Cart
              </button>
            </Link>
            <Link to="/login">
              <button
                className="btn btn-danger"
                type="button"
                style={{ color: "white", background: "#272744" }}
                onClick={Cookies.remove("oJogoBonito")}
              >
                Logout
              </button>
            </Link>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;
