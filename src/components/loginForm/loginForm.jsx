import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Joi from "joi-browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from "../common/form";
import NavBar from "../navBar";
import { getUser } from "../../services/apiConfiguration";
import "./loginForm.css";

let inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

class LoginForm extends Form {
  state = {
    redirect: false,
    insertedData: false,
    rememberMe: false,
    data: { username: "", password: "" },
    errors: {}
  };

  handleCheckChange = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  onClick = async () => {
    let userData = await getUser(this.state.data.username);
    if (userData !== undefined) {
      if (userData.password === this.state.data.password) {
        this.props.history.push('/shop/products');
        this.state.rememberMe ? Cookies.set("ojb", userData) : Cookies.set("ojb", userData, { expires: inThirtyMinutes });
      } 
      else {
        toast.warn("Your username and/or password is wrong");
      } 
      console.log(Cookies.get("ojb"));
    }
  }

  schema = {
    username: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  render() {
    return (
      <React.Fragment>
        <NavBar currentPage="login" />
        <div className="centered" style={{color:"white"}}>
          <form 
            onSubmit={e => e.preventDefault()} 
            style={{ border: "none" }}
          >
          <h3 
            className="display-4 text-center" 
            style={{ marginBottom: "20px" }}
          >
            <b>Login</b>
          </h3>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="dropdownCheck"
                checked={this.state.rememberMe}
                onChange={this.handleCheckChange}
              />
              <label className="form-check-label" htmlFor="dropdownCheck">
                Remember me
              </label>
            </div>
            <div style={{ marginTop: "20px" }}>
              <button 
                disabled={this.validate()}
                className="btn btn-primary"
                onClick={this.onClick}
              >
                Login
              </button>
              <Link to="/register">
                <button 
                  className="btn btn-dark">
                  Don't have a user? Register
                </button>
              </Link>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginForm);
