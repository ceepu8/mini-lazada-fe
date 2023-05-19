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

  uploadAvatar: (token, data) => {
    return axios({
      method: "POST",
      url: `${API_URL}/user/upload-image`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getProfile: (token) => {
    return axios({
      method: "GET",
      url: `${API_URL}/auth/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
