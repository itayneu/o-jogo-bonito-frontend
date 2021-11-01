import React, { Component } from "react";
import _ from "lodash";
import AdminDataTable from "./adminDataTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getData } from "../services/apiConfiguration";
import { getDataTypes } from "../services/fakeDataTypesService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import NavBar from "./navBar";

class AdminData extends Component {
  state = {
    data: [],
    dataTypes: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    selectedDataType: null,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    let data = [];
    let items = await getData("items");
    items.map(
      (item) => ((item.dataType = "Items"), (item.name = item.itemName))
    );
    let users = await getData("users");
    users.map(
      (user) => ((user.dataType = "Users"), (user.name = user.firstName))
    );
  
    data = [...users, ...items];
    const dataTypes = [...getDataTypes()];
    const selectedDataType = "Users";

    this.setState({ data, dataTypes, selectedDataType });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDataTypeSelect = (dataType) => {
    this.setState({
      selectedDataType: dataType,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedDataType,
      searchQuery,
      data: allData,
    } = this.state;
    let filtered = allData;

    if (searchQuery) {
      filtered = allData.filter(
        (f) => f.dataType === this.state.selectedDataType
      );
      if (this.state.selectedDataType === "Users") {
        filtered = filtered.filter(
          (f) =>
            f.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            f.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            f.username.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }

      if (this.state.selectedDataType === "Items") {
        filtered = filtered.filter((f) =>
          f.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          f.brand.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }
    } else if (selectedDataType)
      filtered = allData.filter((f) => f.dataType === selectedDataType);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: data };
  };

  render() {
    const { length: count } = this.state.data;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no data in the database.</p>;

    const { totalCount, data: data } = this.getPagedData();

    return (
      <React.Fragment>
        <NavBar currentPage="admin" />
        <div className="container" style={{ marginTop: "8%" }}>
        <div
            style={{
              marginLeft: "1.3%",
              marginTop: "10%", color: "white"
            }}
          >
            <h3 className="display-4">
              <b>Admin Panel</b>
            </h3>
          </div>
          <div className="row ">
            <div className="col-2">
              <ListGroup
                items={this.state.dataTypes}
                selectedItem={this.state.selectedDataType}
                onItemSelect={this.handleDataTypeSelect}
              />
            </div>
            <div className="col">
              <SearchBox
                style={{ marginBottom: "5px" }}
                value={searchQuery}
                onChange={this.handleSearch}
                dataType={this.state.selectedDataType}
              />
              <p
                style={{
                  marginLeft: "1.3%",
                  marginBottom: "0.001%",
                  marginTop: "3%",
                  fontSize: "14px",
                  color:"white",
                }}
              >
                Showings {totalCount}{" "}
                {this.state.selectedDataType.toLowerCase()}
              </p>
              <div style={{color:"white"}}>
              <AdminDataTable
                data={data}
                sortColumn={sortColumn}
                onApply={this.handleSearch}
                onSort={this.handleSort}
                dataType={this.state.selectedDataType}
                tableSource="admin"
              />
              </div>
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

export default AdminData;
