import http from "./httpService";
import { toast } from "react-toastify";
import configuration from "../services/configuration.json";

const headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

export async function getData(type) {
  try {
    const serverResponse = await http.get(
      `${configuration.mainRoute}/${type}/getall`
    );
    return serverResponse.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(username) {
  try {
    const serverResponse = await http.post(
      `${configuration.mainRoute}/users/login`,
      { username: username }
    );
    if ("error" in serverResponse.data) throw Error;
    return serverResponse.data;
  } catch (error) {
    toast.warn("Could not find user");
  }
}

export async function addUser(data) {
  try {
    const serverResponse = await http.post(
      `${configuration.mainRoute}/users/signup/add`,
      data
    );
    return serverResponse.data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendTransaction(data) {
  try {
    const serverResponse = await http.post(
      `${configuration.mainRoute}/transactions/newPurchase`,
      data
    );
    console.log("hello");
    console.log(serverResponse.data);
    return serverResponse.data;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}
