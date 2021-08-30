import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { Route, Redirect } from 'react-router'
import { Link } from "react-router-dom";
import "./loginForm.css";
import { getUser } from "../../services/apiConfiguration";
import Cookies from "js-cookie";
import { withRouter } from "react-router";
import NavBar from "../navBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
let loggedIn = false;

class LoginForm extends Form {
  state = {
    redirect: false,
    insertedData: false,
    rememberMe: false,
    data: { username: "", password: "" },
    errors: {},
    navigate: false,
    admin: false
  };

  handleCheckChange = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  };

  onClick = async () => {
    alert("get");
    //this.setState({ navigate: true });
    let userData = await getUser(this.state.data.username);
    if (userData != undefined) {
      alert("db pass = " + userData.password);
      alert("entered pass = " + this.state.data.password);
      if ("password" in userData) {
        alert("password exists");
        if (userData.password === this.state.data.password) {
          alert("password match");
          this.props.history.push('/aboutUs')
          this.state.rememberMe
            ? Cookies.set("oJogoBonito", userData)
            : Cookies.set("oJogoBonito", userData, {
                expires: inThirtyMinutes,
              });
            alert("welcome " + this.state.data.username);
        } 
        else {
          toast.warn("One of the details was entered wrong");
          alert("Password is wrong");
        }
      } 
      else {
        toast.warn("One of the details was entered wrong");
        alert("Password does not exist");
      }
      console.log(Cookies.get("oJogoBonito"));
      alert("cookies = " + Cookies.get("oJogoBonito"));
    }
    else {
      toast.warn("One of the details was entered wrong");
      alert("username is wrong");
    }
  }


  schema = {
    username: Joi.string().required().min(3).label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  render() {
    
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to="/shop/products" push={true} />
    }

    return (
      <React.Fragment>
        <NavBar currentPage="login" />
        <div className="centered" style={{color:"white"}}>
          <form onSubmit={e => e.preventDefault()} style={{ border: "none" }}>
          <h3 className="display-4 text-center" style={{ marginBottom: "20px" }}>
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
              <button disabled={this.validate()}
                className="btn btn-primary"
                onClick={this.onClick}
                
              >
                <Route exact path="/" render={() => (
                  loggedIn ? (
                    <Redirect to="/aboutUs"/>
                  ) : (
                    <Redirect to="/contactUs"/>
                  )
                )}/>
                Login
              </button>
              {this.renderButton(
                "/register",
                "",
                "btn btn-dark",
                "button",
                "",
                "Don't have a user? Register"
              )}
              <ToastContainer />
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginForm);
