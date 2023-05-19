const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const authApi = {
  register: (data) => {
    return axios({
      method: "POST",
      url: `${API_URL}/auth/register`,
      data: data,
    });
  },
};
