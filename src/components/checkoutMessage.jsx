import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navBar";

const CheckoutMessage = () => {
  return (
    <React.Fragment>
      <NavBar currentPage="cart" />
      <div className="container" style={{color:"white"}}>
        <div className="centered display-4">Thank you for your order!</div>
        <div className="centerd display-5">
          <Link
            className="btn btn-dark btn-sm"
            to="shop/products"
            role="button"
          >
            Back to the shop
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutMessage;
