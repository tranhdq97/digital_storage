import axiosCrossDomainHttpService, {axiosHttpService} from "src/utils/httpService";

const API_LOGIN = import.meta.env.VITE_API_PORTAL_LOGIN;
const API_REGISTER = import.meta.env.VITE_API_PORTAL_REGISTER;
const API_LOGOUT = import.meta.env.VITE_API_PORTAL_LOGOUT;

const AuthenAPIService = {
    login: async (email, password) => {
        try {
            const response = await axiosHttpService.post(API_LOGIN, {
                email: email,
                password: password
            });
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    logout: async () => {
        try {
            const response = await axiosHttpService.post(API_LOGOUT, {});
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    register: async (email, username, password) => {
        try {
            const response = await axiosHttpService.post(API_REGISTER, {
                email: email,
                username: username,
                password: password
            });
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default AuthenAPIService;
