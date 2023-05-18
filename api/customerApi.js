import { filterUndefinedProperties } from "../utils/index.js";

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
};
