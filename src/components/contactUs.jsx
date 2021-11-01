import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from 'react-router'
import NavBar from "./navBar";

class ContactUs extends Form {
  state = {
    data: { fullname: "", email: "", message: "" },
    errors: {},
    navigate: false
  };

  schema = {
    fullname: Joi.string().required().label("Full name"),
    email: Joi.string().required().email().label("Email"),
    message: Joi.string().required().label("Message"),
  };

  render() {
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to="/contactUsMessage" push={true} />
    }

    return (
      <React.Fragment>
        <NavBar currentPage="contactUs" />
        <div className="container" style={{color: "white"}}>
          <div
            style={{
              marginLeft: "1.3%",
              marginTop: "10%",
            }}
          >
            <h3 className="display-4">
              <b>Contact us</b>
            </h3>
          </div>
          <div
            style={{
              marginLeft: "1.3%",
              marginBottom: "0.4%",
              marginTop: "0.2%",
              fontSize: "20px",
            }}
          >
            <p>
              {" "}
              We'd love to hear from you!
              <br />
              Please fill the form if you have any question.
            </p>
          </div>
          <form style={{ marginLeft: "1.3%", border: "none" }}>
            <div style={{ width: "40%" }}>
              {this.renderInput("fullname", "Full name")}
              {this.renderInput("email", "Email")}
            </div>
            <div style={{ width: "40%" }}>
              {this.renderInput("message", "Message")}
            </div>
            <div>
            <button disabled={this.validate()}
                className="btn btn-primary"
                onClick={
                  async () => {
                    this.setState({ navigate: true })
                  }
                }
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ContactUs;
