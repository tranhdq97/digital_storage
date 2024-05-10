import axiosHttpService from "src/utils/httpService";

const API_USERINFO = import.meta.env.VITE_API_USER_INFO;
const API_STORAGE_GET_ORGAN_ALL = import.meta.env.VITE_API_STORAGE_GET_ORGAN_ALL;
const API_ORGAN_GET_SINGLE_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_SINGLE_DEPARTMENT;

const UserAPIService = {
    getUserInfo: async () => {
        try {
            const response = await axiosHttpService.get(API_USERINFO);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getUserOrgan: async () => {
        try {
            const userInfo = await axiosHttpService.get(API_USERINFO);
            const departmentId = userInfo.data.department;
            const departmentInfo = await axiosHttpService.get(API_ORGAN_GET_SINGLE_DEPARTMENT + '/' + departmentId);
            const organId = departmentInfo.data.organ;
            const response = await axiosHttpService.get(API_STORAGE_GET_ORGAN_ALL + '/' + organId);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

export default UserAPIService;
