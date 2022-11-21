import axios from "axios";

export const loginAuthService = async (endpoint, body) => {
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

export const getCurrentUserAuthService = async (endpoint, body) => {
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

export const getUsersAuthService = async (endpoint) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + endpoint
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
