import React from "react";
import { withRouter } from 'react-router'
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Joi from "joi-browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from "../common/form";
import { addUser , getUser } from "../../services/apiConfiguration";
import NavBar from "./../navBar";

let inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);

class RegisterForm extends Form {
  state = {
    data: { firstName: "", lastName: "", username: "", password: "" },
    errors: {}
  };

  onClick = async () => {
    let userData = await getUser(this.state.data.username);
    if (userData === undefined) {
      userData = await addUser(this.state.data);
      userData = await getUser(this.state.data.username);
      Cookies.set("ojb", userData, { expires: inThirtyMinutes });
      this.props.history.push('/shop/products');
    }
    else {
      toast.warn("Username \"" + this.state.data.username + "\" already exists");
    } 
    console.log(Cookies.get("ojb"));
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
          <form 
            onSubmit={e => e.preventDefault()} 
            style={{ border: "none" }}
          >
          <h3 
            className="display-4 text-center" 
            style={{ marginBottom: "20px" }}
          >
            <b>Register</b>
          </h3>
            {this.renderInput("firstName", "First name")}
            {this.renderInput("lastName", "Last name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password")}
            <div style={{ marginTop: "20px" }}>
              <button 
                disabled={this.validate()}
                className="btn btn-primary"
                onClick={this.onClick}
              >
                Send
              </button>
              <Link to="/login">
                <button 
                  className="btn btn-dark">
                  Already registered? Login
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

export default withRouter(RegisterForm);
