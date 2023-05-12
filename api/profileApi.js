const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const profileApi = {
  getMyAvatar: (token) => {
    return axios({
      method: "GET",
      url: `${API_URL}/user/avatar`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createAvatar: (token, data) => {
    return axios({
      method: "post",
      url: `${API_URL}/user`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};