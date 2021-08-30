import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getUser } from "../services/fakeUserService";
import { getDataTypes } from "../services/fakeDataTypesService";

class DataForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    dataTypes: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const dataTypes = getDataTypes();
    this.setState({ dataTypes });

    const dataID = this.props.match.params.id;
    if (dataID === "new") return;

    const data = getUser(dataID);
    if (!data) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(data) {
    return {
      _id: data._id,
      /*title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,*/
    };
  }

  doSubmit = () => {
    // saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        {/*<form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
    </form>*/}
      </div>
    );
  }
}

export default DataForm;
