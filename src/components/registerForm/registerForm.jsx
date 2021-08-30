import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { Redirect } from 'react-router'
import { withRouter } from "react-router";
import { addUser , getUser } from "../../services/apiConfiguration";
import Cookies from "js-cookie";
import NavBar from "./../navBar";


class RegisterForm extends Form {
  state = {
    data: { firstName: "", lastName: "", username: "", password: "" },
    errors: {},
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    alert(this.state.redirect);
    if (this.state.redirect) {
      
      return <Redirect to="/aboutUs" push={true} />
    }
  }

  schema = {
    firstName: Joi.string().required().label("First name"),
    lastName: Joi.string().required().label("Last Name"),
    username: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  render() {
    return (
      <React.Fragment>
        <NavBar currentPage="register" />
        <div className="centered" style={{color:"white"}}>
          <form style={{ border: "none" }}>
            <h3 className="display-4 text-center" style={{ marginBottom: "20px" }}>
              <b>Register</b>
            </h3>
            <div style={{ border: "none", marginBottom: "20px" }}>
              {this.renderInput("firstName", "First name")}
              {this.renderInput("lastName", "Last name")}
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password")}
              {this.renderRedirect()}
              <button disabled={this.validate()}
                className="btn btn-primary"
                onClick={this.setRedirect}
              >
                Send
              </button>
              {this.renderButton(
                "/login",
                "",
                "btn btn-dark",
                "button",
                "",
                "Already registered? Login"
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(RegisterForm);
