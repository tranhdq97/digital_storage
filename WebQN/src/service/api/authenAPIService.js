import axiosHttpService from "src/utils/httpService";

const API_LOGIN = import.meta.env.VITE_API_LOGIN;
const API_LOGOUT = import.meta.env.VITE_API_LOGOUT;
const API_LOGIN_EOFFICE = import.meta.env.VITE_API_LOGIN_EOFFICE;
const AuthenAPIService = {
    login: async (email, password, sso) => {
        try {
            const response = await axiosHttpService.post(API_LOGIN, {
                email,
                password,
                sso
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

    loginEoffice: async (email, password) => {
        try {
            const url = `${API_LOGIN_EOFFICE}/${email}/${password}`;
            const response = await axiosHttpService.get(url);
            if (response.status !== 200) {
                return null;
            } else {
                return response.data;
            }
        }catch(e){
            console.log('err in login eoffice', e);
            return null;
        }
    },

    // register: async (email, username, password) => {
    //     try {
    //         const response = await axiosHttpService.post(API_REGISTER, {
    //             email: email,
    //             username: username,
    //             password: password
    //         });
    //         return response.data;
    //     } catch (err) {
    //         console.log(err);
    //         return null;
    //     }
    // }
}

export default AuthenAPIService;
