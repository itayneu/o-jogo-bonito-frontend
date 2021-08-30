import React, { Component } from "react";
import Table from "./common/table";
//import { folderTypes } from "./../services/fakeFolderTypesService";

class AdminDataTable extends Component {
  columnsUsers = [
    {
      path: "name",
      label: "First Name",
      content: (data) => data.name,
    },
    {
      path: "lastName",
      label: "Last Name",
      content: (data) => data.lastName,
    },
    {
      path: "username",
      label: "Username",
      content: (data) => data.username,
    },
  ];

  columnsItems = [
    {
      path: "name",
      label: "Item Name",
      content: (data) => data.name,
    },
    {
      path: "brand",
      label: "Brand",
      content: (data) => data.brand,
    },
    {
      path: "price",
      label: "Price",
      content: (data) => data.price,
    },
    {
      path: "currentAmount",
      label: "Current Amount",
      content: (data) => data.currentAmount,
    },
    {
      path: "soldAmount",
      label: "Amount Already Sold",
      content: (data) => data.soldAmount,
    },
  ];

  render() {
    const { data, onSort, sortColumn, dataType, tableSource } = this.props;
    let columns;
    if (dataType == null) {
      columns = this.columnsUsers;
    } else {
      columns = dataType === "Users" ? this.columnsUsers : this.columnsItems;
    }
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

export default AdminDataTable;
