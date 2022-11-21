import axios from "axios";

export const getMessagesMessageService = async (endpoint) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + endpoint
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createMessageMessageService = async (endpoint, body) => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + endpoint,
      body
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
