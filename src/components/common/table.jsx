import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data, tableSource }) => {
  return (
    <table className="table" style={{color:"white"}}>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} tableSource={tableSource} />
    </table>
  );
};

export default Table;
