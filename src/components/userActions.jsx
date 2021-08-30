import React, { Component } from "react";
import { getUser } from "../services/apiConfiguration";
import NavBar from "./navBar";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import UserActionsTable from "./userActionsTable";
import Pagination from "./common/pagination";

class UserActions extends Component {
  state = {
    user: {},
    userTransactions: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "date", order: "asc" },
  };

  async componentDidMount() {
    const username = this.props.match.params.id;
    const user = await getUser(username);
    const userTransactions = JSON.parse(user.transactions);
    console.log(userTransactions);
    this.setState({ user, userTransactions });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const userTransactions = this.state.userTransactions;
    const { pageSize, currentPage, sortColumn } = this.state;
    const sorted = _.orderBy(
      userTransactions,
      [sortColumn.path],
      [sortColumn.order]
    );
    const data = paginate(sorted, currentPage, pageSize);
    return { totalCount: userTransactions.length, data: data };
  };

  render() {
    const { length: count } = this.state.userTransactions;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>No marked items for buying.</p>;

    const { totalCount, data: data } = this.getPagedData();
    return (
      <React.Fragment>
        <NavBar currentPage="admin" />
        <div className="container" style={{ marginTop: "8%" }}>
          <h1>{`${this.state.user.firstName} ${this.state.user.lastName} History Data`}</h1>
          <div className="row ">
            <div className="col">
              <p
                style={{
                  marginLeft: "1.3%",
                  marginBottom: "0.001%",
                  marginTop: "3%",
                  fontSize: "14px",
                }}
              >
                Showing {totalCount} selected history data items.
              </p>

              <UserActionsTable
                data={data}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                tableSource="actions"
              />
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

export default UserActions;
