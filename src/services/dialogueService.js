import axios from "axios";

export const getDialoguesService = async (endpoint) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + endpoint
    );

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createDialoguesService = async (endpoint, body) => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + endpoint,
      body
    );

    return data;
  } catch (e) {
    console.log(e);
  }
};
