import {serverUrl} from "../Constants/Constants";
import axios from "axios";

class TokenApi {
    constructor() {

        // 33 Staging
        // this.clientId = "id-7591b539-cb6f-4372-d819-e3503b6119c";
        // this.clientSecret = "secret-131718b2-6ef9-8380-5173-a453911d1c2";

        // 42 Staging
        this.clientId = "id-69b8b9e5-479e-234b-d5e6-d71f874a2";
        this.clientSecret = "secret-55806831-aef1-8aec-4710-f583f9f0199a";

        axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && error.response.status === 401 && !error.config._retry) {
                    error.config._retry = true; // Mark this request as already retried

                    try {
                        const refreshedToken = await this.refreshToken();

                        // Update the token in storage and the Axios default header
                        this.storeToken(refreshedToken);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${refreshedToken}`;
                        // Update the authorization header for the original request
                        error.config.headers['Authorization'] = `Bearer ${refreshedToken}`;

                        // Retry the original request with the new token
                        return axios(error.config);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

    }

    getAuthData() {
        return `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    }

    execute = (api, params) => {
        return new Promise((resolve, reject) => {
            let data = this.getAuthData();

            const api_path = `${serverUrl}${api.path}`;
            let headers = {
                "Authorization": `Bearer ${this.getToken()}`,
            };

            axios({
                method: api.method,
                url: api_path,
                data: api.method === "post" ? params : data,
                headers: {
                    ...headers,
                    "Content-Type": api.method === "post" ? "application/json" : "application/x-www-form-urlencoded",
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    let message = "Request Failed.";
                    if (error.response && error.response.data && error.response.data.message) {
                        message = error.response.data.message;
                    }
                    reject({message});
                });
        });
    };

    getToken() {
        return sessionStorage.getItem("token");
    }
}

export default new TokenApi();