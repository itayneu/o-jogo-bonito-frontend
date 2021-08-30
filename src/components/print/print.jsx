import React from "react";
import { Link } from "react-router-dom";
import configuration from "../../services/configuration.json";
import NavBar from "../navBar";
import "./print.css";
import Joi from "joi-browser";
import Form from "../common/form";

class Print extends Form {
  state = {
    data: { name: "", number: ""},
    errors: {}
  };

  schema = {
    name: Joi.string().required().max(16).label("Name"),
    number: Joi.number().required().min(1).max(99).label("Number"),
  };

  

  render() {
    let location = this.props.location.customObject
    let image = (location == undefined) ? "ajax_home_21_22" : location.image;
    let printColor = (location == undefined) ? "white" : location.color;
    const divStyle = {
      color: printColor,
    }; 

    return (
      <React.Fragment>
        <NavBar currentPage="print" />
        <div className="container" >
          <div
            style={{
              marginLeft: "1.3%",
              marginTop: "10%",
              color:"white"
            }}
          >
            <h3 className="display-4">
              <b>Personalized Print</b>
            </h3>
          </div>
          <div
            style={{
              marginLeft: "1.3%",
              marginBottom: "0.4%",
              marginTop: "0.2%",
              fontSize: "20px",
              color:"white"
            }}
          >
            <p>
              Choose a name and a number to preview your personalized shirt:
              <br />
             
            </p>
          </div>
          <form style={{ marginLeft: "1.3%", border: "none" }}>
            <div style={{ width: "40%", color:"white" }}>
              {this.renderInput("name", "Name")}
              {this.renderInput("number", "Number", "number")}
              <Link
                className="btn btn-dark btn-sm"
                to="shop/products"
                role="button"
              >
                Click here to change shirt
              </Link>
            </div>
          </form>
          <br/>
          
          <div 
          class="image"
          style={{
            marginLeft: "1.3%",
            marginBottom: "0.4%",
            marginTop: "0.2%",
            fontSize: "20px",
          }}>
            <img src={`${configuration.imageData}/${image}_back.jpg`} alt="" height="500" />    
            <div class="name" style={divStyle}>{this.state.data.name}<br /></div>
            <div class="number" style={divStyle}>{this.state.data.number}<br /></div>
            </div><br/>
          </div>     
      </React.Fragment>
    );
  }
}

export default Print;
