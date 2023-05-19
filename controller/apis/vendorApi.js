const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const vendorApi = {
  getMyProducts: (token) => {
    return axios({
      method: "GET",
      url: `${API_URL}/product/get-my-products`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createProduct: (token, data) => {
    return axios({
      method: "post",
      url: `${API_URL}/product`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
