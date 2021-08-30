import React, { Component } from "react";
import { Link } from "react-router-dom";
import configuration from "../../services/configuration.json";
import NavBar from "../navBar";
import SearchBox from "../searchBox";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Products extends Component {
  state = {
    data: [],
    searchQuery: "",
    selectedDataType: "Items"
  };

  getChunks = (size) => {
    let results = [];
    let items = [];
    this.props.items.map((item) => items.push(item));
    if (items) {
      while (items.length) {
        results.push(items.splice(0, size));
      }
      return results;
    }
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      //selectedDataType: null,
      currentPage: 1,
    });
  };

  getPagedData = () => {
    const {
      selectedDataType,
      searchQuery,
      data: allData
    } = this.state;
    let filtered = allData;

    if (searchQuery) {
      filtered = allData.filter(
        (f) => f.dataType === this.state.selectedDataType
      );
      

      if (this.state.selectedDataType === "Items") {
        filtered = filtered.filter((f) =>
          f.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }
    } else if (selectedDataType)
      filtered = allData.filter((f) => f.dataType === selectedDataType);

    //const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    //const data = paginate(sorted, currentPage, pageSize);
    //return { totalCount: filtered.length, data: data };
  };

  getItem = (itemId) => {
    for (let i = 0; i < this.props.items.length; i++) {
      if (itemId === this.props.items[i].itemId) return this.props.items[i];
    }
    return null;
  };

  handleIncrementClick = (e) => {
    const item = this.getItem(e.target.id);
    this.props.handleIncrement(item);
    //alert(item.itemName);
  };

  handleDecrementClick = (e) => {
    const item = this.getItem(e.target.id);
    this.props.handleDecrement(item);
  };

  render() {
    const { searchQuery } = this.state;
    let items = this.getChunks(4);
    if (items) {
      return (
        <React.Fragment>
          <NavBar currentPage="products" />
          <div className="container" style={{ marginTop: "6%" }}>
            <SearchBox
              style={{ marginBottom: "5px" }}
              value={searchQuery}
              onChange={this.handleSearch}
              dataType="Items"
            />
            <table className="table">
              <tbody>
                {items.map((item) => (
                  <tr>
                    {item.map((i) => (
                      <td key={i.itemId} style={{ textAlign: "center", color: "white" }}>
                        <div
                          className="container"
                          style={{ display: "inline-block" }}
                        >
                          <img
                            src={`${configuration.imageData}/${i.image}.jpg`}
                            height="250px"
                            width="250px"
                            alt=""
                          />
                          <span
                            style={{ display: "block", fontWeight: "bold" }}
                          >
                            {i.itemName}
                          </span>
                          <span
                            style={{ display: "block" }}
                          >
                            {i.brand}
                          </span>
                          <h4 style={{ fontWeight: "bold", textAlign:"center" }}>{i.price}</h4>
                          
                          <div
                            style={{
                              display: "flex",
                              width: "5%",
                              marginLeft: "3%"
                            }}
                          >
                            <button
                              id={i.itemId}
                              className="btn btn-success btm-sm"
                              style={{ display: "inline-block" }}
                              onClick={this.handleIncrementClick}
                            >
                              Add
                            </button>
                            
                            <button
                              id={i.itemId}
                              className="btn btn-danger btm-sm"
                              style={{
                                display: "inline-block",
                                height: "50px",
                              }}
                              onClick={this.handleDecrementClick}
                            >
                              Remove
                            </button>
                            <ToastContainer
                              position="bottom-center"
                              autoClose={2000}
                              hideProgressBar
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              width: "200%",
                              marginLeft: "20%",
                              marginTop: "5%"
                            }}
                          >
                            <Link
                            className="btn btn-dark btn-sm"                      
                              to={{
                                pathname: "/print",
                                customObject: {image: i.image, color:i.printColor}
                              }}
                              role="button"
                            >
                              Personalized print
                              </Link>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      );
    } else return <h1></h1>;
  }
}

export default Products;
