import React, { Component } from "react";
import Table from "./common/table";

class CartTable extends Component {
  columnsItems = [
    {
      path: "itemName",
      label: "Item Name",
      content: (data) => data.itemName,
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
      path: "boughtAmount",
      label: "Amount",
      content: (data) => data.boughtAmount,
    },
    {
      path: "totalItemPrice",
      label: "Total Item Price",
      content: (data) => data.price * data.boughtAmount,
    },
  ];

  render() {
    const { data, onSort, sortColumn, tableSource } = this.props;
    let columns = this.columnsItems;
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

export default CartTable;
