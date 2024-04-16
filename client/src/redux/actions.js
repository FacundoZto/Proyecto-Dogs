import axios from "axios";
const URL = "https://proyecto-dogs-one.vercel.app";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const ORDER_DOGS = "ORDER_DOGS";
export const FILTER_DOGS = "FILTER_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const CREATE_DOG = "CREATE_DOG";
export const DOG_DETAIL = "DOG_DETAIL";

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      let dogs = await axios.get(`${URL}/dogs`);
      dispatch({
        type: "GET_ALL_DOGS",
        payload: dogs.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDogByName = (raza) => {
  return async (dispatch) => {
    try {
      let dog = await axios.get(`${URL}/dogs?name=${raza}`);
      dispatch({
        type: "GET_DOG_BY_NAME",
        payload: dog.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const orderDogs = (order) => {
  return async (dispatch) => {
    try {
      let dogOrdered = await axios.get(`${URL}/order/${order}`);
      dispatch({
        type: "ORDER_DOGS",
        payload: dogOrdered.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterDogs = (filter) => {
  return async (dispatch) => {
    try {
      let dogFiltered = await axios.get(`${URL}/filter/${filter}`);
      dispatch({
        type: "FILTER_DOGS",
        payload: dogFiltered.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      let allTemperaments = await axios.get(`${URL}/temperament`);
      dispatch({
        type: "GET_TEMPERAMENTS",
        payload: allTemperaments.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterByTemperament = (temperament) => {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload: temperament,
  };
};

export const createDog = (dogData) => {
  return async () => {
    try {
      let created = await axios.post(`${URL}/dog`, dogData);
      return created.data;
    } catch (err) {
      console.log(err);
    }
  };
};

export const dogDetail = (id) => {
  return async (dispatch) => {
    try {
      let details = await axios.get(`${URL}/dogs/${id}`);
      dispatch({
        type: "DOG_DETAIL",
        payload: details.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
