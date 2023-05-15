const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const shipperApi = {
  getHubs: () => {
    return axios({
      method: "GET",
      url: `${API_URL}/hub`,
    });
  },
};
