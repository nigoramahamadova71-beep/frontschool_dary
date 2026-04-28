import axios from "axios";

const API = axios.create({
  baseURL: "https://school-dary.onrender.com/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ❗ добавили проверку error.response
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh_token");

      // ❗ если нет refresh → logout
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "https://school-dary.onrender.com/api/token/refresh/",
          { refresh },
        );

        // ❗ поддержка разных форматов ответа
        const newAccess = response.data.access || response.data.access_token;

        // ❗ проверка
        if (!newAccess) {
          throw new Error("No access token");
        }

        localStorage.setItem("access_token", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return API(originalRequest);
      } catch (err) {
        // ❗ если refresh умер → полный logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
