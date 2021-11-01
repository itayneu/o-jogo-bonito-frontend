import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from "./products";
import Cart from "./cart";
import { getData } from "../services/apiConfiguration";

class ShopCoordinator extends Component {
  state = { items: [], pageToDisplay: "products" };

  async componentDidMount() {
    const items = await getData("items");
    const pageToDisplay = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    this.setState({ items, pageToDisplay });
  }

  componentDidUpdate() {
    const pageToDisplay = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    if (this.state.pageToDisplay !== pageToDisplay) {
      this.setState({ pageToDisplay });
    }
  }

  getIndexOf = (item) => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (item.itemId === this.state.items[i].itemId) return i;
    }
    return -1;
  };

  handleIncrement = (item) => {
    if (item.currentAmount <= 0) toast.error(item.itemName + " is out of stock");
    else {
      if ("boughtAmount" in item) {
        if (item.boughtAmount === item.currentAmount) toast.warn("We have only " + item.boughtAmount + " " + item.itemName + " in stock");
        else {
          item.boughtAmount++;
          toast(item.boughtAmount + " " + item.itemName + " added to the cart");
        } 
      } 
      else {
        item.boughtAmount = 1;
        toast(item.boughtAmount + " " + item.itemName + " added to the cart");
      }
      const items = [...this.state.items];
      const index = this.getIndexOf(item);
      items[index] = { ...item };
      this.setState({ items });      
      console.log(item);
    }
  };

  handleDecrement = (item) => {
    if ("boughtAmount" in item) {
      if (item.boughtAmount > 0) {
        item.boughtAmount--;
        toast(item.boughtAmount + " " + item.itemName + " are in the cart");
      }
    }
    else {
      toast("There are no " + item.itemName + " in the cart");
    }
    const items = [...this.state.items];
    const index = this.getIndexOf(item);
    items[index] = { ...item };
    this.setState({ items });
  };

  render() {
    if (this.state.pageToDisplay === "cart") {
      console.log("cart");
      return <Cart items={this.state.items} />;
    } else {
      return (
        <Products
          items={this.state.items}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
      );
    }
  }
}

export default ShopCoordinator;
