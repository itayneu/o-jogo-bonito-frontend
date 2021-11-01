import React, { Component } from "react";
import Table from "./common/table";

class UserActionsTable extends Component {
  columnsData = [
    {
      path: "date",
      label: "Date",
      content: (data) => data.date,
    },
    {
      path: "items",
      label: "Items",
      content: (data) => data.purchases.length,
    },
  ];

  render() {
    const { data, onSort, sortColumn, tableSource } = this.props;
    let columns = this.columnsData;
    return (
      <Table
        columns={columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        tableSource={tableSource}
      />
    );
  }
}

export default UserActionsTable;
