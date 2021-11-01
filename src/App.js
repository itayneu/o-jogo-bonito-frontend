import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AboutUs from "./components/aboutUs";
import AdminData from "./components/adminData";
import LoginForm from "./components/loginForm/loginForm";
import Checkout from "./components/checkout";
import CheckoutMessage from "./components/checkoutMessage";
import ContactUs from "./components/contactUs";
import ContactUsMessage from "./components/contactUsMessage";
import NotFound from "./components/notFound";
import Print from "./components/print/print";
import RegisterForm from "./components/registerForm/registerForm";
import ShopCoordinator from "./components/shopCoordinator";
import Stores from "./components/stores/stores";
import UserActions from "./components/userActions";

function App() {
  return (
    <div className="content">
      <Switch>
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/admin/undefined" component={AdminData} />
        <Route path="/admin/:id" component={UserActions} />
        <Route path="/admin" component={AdminData} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/checkoutMessage" component={CheckoutMessage} />
        <Route path="/contactUs" component={ContactUs} />
        <Route path="/contactUsMessage" component={ContactUsMessage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/print" component={Print} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/shop/cart" component={ShopCoordinator} />
        <Route path="/shop/products" component={ShopCoordinator} />
        <Route path="/stores" component={Stores} />
        <Redirect from="/" exact to="/login" />
        <Redirect to="/shop/products" />
      </Switch>
    </div>
  );
}

export default App;
