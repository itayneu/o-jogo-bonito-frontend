import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm/loginForm";
import AdminData from "./components/adminData";
import RegisterForm from "./components/registerForm/registerForm";
import NotFound from "./components/notFound";
import ContactUs from "./components/contactUs";
import ContactUsMessage from "./components/contactUsMessage";
import AboutUs from "./components/aboutUs";
import Stores from "./components/stores/stores";
import Print from "./components/print/print";
import ShopCoordinator from "./components/shopCoordinator";
import CheckoutMessage from "./components/checkoutMessage";
import CheckOut from "./components/checkout";
import UserActions from "./components/userActions";
import "./App.css";

function App() {
  return (
    //<Enter />
    <div>
      <div className="content">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/admin/:id" component={UserActions} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/stores" component={Stores} />
          <Route path="/print" component={Print} />
          <Route path="/shop/products" component={ShopCoordinator} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/contactUsMessage" component={ContactUsMessage} />
          <Route path="/admin" component={AdminData} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/shop/cart" component={ShopCoordinator} />
          <Route path="/checkoutMessage" component={CheckoutMessage} />
          <Route path="/checkout" component={CheckOut} />
          <Redirect from="/" exact to="/login" />
          <Redirect to="/shop/products" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
