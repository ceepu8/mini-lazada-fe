import { filterUndefinedProperties } from "../../utils";

const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const customerApi = {
  getProducts: (params) => {
    const filteredParams = filterUndefinedProperties(params);
    return axios({
      method: "GET",
      url: `${API_URL}/product`,
      params: filteredParams,
    });
  },
  getProductById: (id) => {
    return axios({
      method: "GET",
      url: `${API_URL}/product/${id}`,
    });
  },
  getOrders: (token) => {
    return axios({
      method: "GET",
      url: `${API_URL}/order`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createOrder: (token, data) => {
    return axios({
      method: "POST",
      url: `${API_URL}/order`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
