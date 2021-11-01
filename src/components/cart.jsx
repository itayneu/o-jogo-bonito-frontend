import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import CartTable from "./cartTable";
import NavBar from "./navBar";

class Cart extends Component {
  state = {
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "itemName", order: "asc" },
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const items = this.props.items
      .filter((item) => "boughtAmount" in item)
      .filter((item) => item.boughtAmount > 0);
    const { pageSize, currentPage, sortColumn } = this.state;
    const sorted = _.orderBy(items, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);
    return { totalCount: items.length, data: data };
  };

  getTotalPrice = (items) => {
    let sum = 0;
    items.map((item) => {
      return sum = sum + item.price * item.boughtAmount;
    });
    return Math.round(sum * 100) / 100;
  };

  renderButton(
    target = "",
    className = "btn btn-primary",
    type = "button",
    label
  ) {
    return (
      <Link to={target}>
        <button className={className} type={type}>
          {label}
        </button>
      </Link>
    );
  }

  render() {
    const { length: count } = this.props.items;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>No marked items for buying.</p>;

    const { totalCount, data: data } = this.getPagedData();
    return (
      <React.Fragment>
        <NavBar currentPage="cart" />
        <div className="container" style={{ color: "white", marginTop: "8%" }}>
        <div
            style={{
              marginLeft: "1.3%",
              marginTop: "10%"
            }}
          >
            <h3 className="display-4">
              <b>My Cart</b>
            </h3>
          </div>
          <div className="row ">
            <div className="col">
              <p
                style={{
                  marginLeft: "1.3%",
                  marginBottom: "0.001%",
                  fontSize: "14px",
                }}
              >
                Showing {totalCount} selected items
              </p>

              <CartTable
                data={data}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                tableSource="cart"
              />
              <br></br>
              <h3><b>Total:</b> {this.getTotalPrice(data)}</h3>
              <Link
                className="btn btn-primary btn-md"
                to={{ pathname: "/checkout", aboutProps: { data: data } }}
                role="button"
              >
                Checkout
              </Link>

              <div className="fixed-bottom" style={{ left: "22%" }}>
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cart;
