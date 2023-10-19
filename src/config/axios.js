import axios from "axios";



const apiClient = axios.create({
    baseURL: 'https://shopx-backend.onrender.com/' ,
    headers: {
      'Content-type': 'application/json',
    },
  })

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 500) {
        console.error('Internal Server Error', error.response);
      }
      return Promise.reject(error);
    }
  );
export default apiClient