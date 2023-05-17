const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const customerApi = {
  getProducts: (params) => {
    const { page = 1, limit = 2 } = params;
    return axios({
      method: "GET",
      url: `${API_URL}/product?page=${page}&limit=${limit}`,
    });
  },
};
