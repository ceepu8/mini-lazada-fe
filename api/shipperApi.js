const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const shipperApi = {
  getHubs: () => {
    return axios({
      method: "GET",
      url: `${API_URL}/hub`,
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
  getOrder: (token, orderId) => {
    return axios({
      method: "GET",
      url: `${API_URL}/order/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateOrderStatus: (token, orderId, status) => {
    return axios({
      method: "PUT",
      url: `${API_URL}/order/${orderId}?status=${status}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
