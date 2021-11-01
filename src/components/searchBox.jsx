import React from "react";

const SearchBox = ({ value, onChange, dataType }) => {
  let placeholder =
    dataType === "Users" ? "first name, last name or username" : "item name or brand";
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={"Search " + placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
