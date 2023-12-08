import axios from "axios";
import { notification } from "antd";

const service = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 60000,
});

// API Request interceptor
service.interceptors.request.use(
    (config) => config,
    (error) => {
        // Do something with request error here
        notification.error({
            message: "Error",
        });
        Promise.reject(error);
    }
);

// API respone interceptor
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        let notificationParam = {
            message: "",
        };

        if (error.response.status === 400) {
            notificationParam.message = "Bad request";
        }

        if (error.response.status === 404) {
            notificationParam.message = "Not Found";
        }

        if (error.response.status === 500) {
            notificationParam.message = "Internal Server Error";
        }

        if (error.response.status === 508) {
            notificationParam.message = "Time Out";
        }

        notification.error(notificationParam);

        return Promise.reject(error);
    }
);

export default service;
