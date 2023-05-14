const API_URL = "https://smoky-mini-lazada-be.onrender.com/api";

export const loginApi = {
  login: (data) => {
    return axios({
      method: "POST",
      url: `${API_URL}/auth/login`,
      data: data
    })
  }
}