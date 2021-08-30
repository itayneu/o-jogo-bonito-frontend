import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Link } from "react-router-dom";
import { sendTransaction } from "../services/apiConfiguration";
import moment from "moment";
import Cookies from "js-cookie";

class CheckOut extends Form {
  state = {
    purchases: [],
    data: { cardHolder: "", cardNumber: "", expiration: "", cvv: "" },
    errors: {},
  };

  componentDidMount() {
    if (this.props) {
      if (this.props.location) {
        if (this.props.location.aboutProps) {
          this.setState({ purchases: this.props.location.aboutProps.data });
        }
      }
    }
  }

  schema = {
    cardHolder: Joi.string().required().label("Card Holder"),
    cardNumber: Joi.string().required().min(8).label("Card Number"),
    expiration: Joi.string().required().min(4).label("Expiration Date"),
    cvv: Joi.string().required().min(3).label("CVV"),
  };

  renderSubmitButton = async () => {
    let dataToSend = {};
    dataToSend.purchases = this.state.purchases;
    dataToSend.paymentData = this.state.data;
    dataToSend.date = moment().format("HH:mm DD/MM/YYY");
    dataToSend.username = JSON.parse(Cookies.get("oJogoBonito")).username;
    alert(dataToSend.username);
    let result = await sendTransaction(dataToSend);
    console.log(result);
    console.log(dataToSend);
  };

  render() {
    return (
      <React.Fragment>
        <div className="centered" style={{color:"white"}}>
          <form style={{ border: "none" }}>
          <h3 className="display-4" style={{ marginBottom: "20px" }}>
              <b>Checkout</b>
            </h3>
            <div>
              {this.renderInput("cardHolder", "Card Holder")}
              {this.renderInput("cardNumber", "Card Number")}
              {this.renderInput("expiration", "Expiration Date")}
              {this.renderInput("cvv", "CVV")}
            </div>
            <Link to="/checkoutMessage">
              <button
              disabled={this.validate()}
                className="btn btn-primary"
                onClick={async () => this.renderSubmitButton}
              >
                Send
              </button>
            </Link>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckOut;
