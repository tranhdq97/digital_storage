import axiosHttpService from "src/utils/httpService";

const API_STORAGE_GET_ORGAN = import.meta.env.VITE_API_STORAGE_GET_ORGAN
const API_ORGAN_GET_DEPARTMENT = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT;
const API_ORGAN_GET_DEPARTMENT_BY_ORGAN = import.meta.env.VITE_API_ORGAN_GET_DEPARTMENT_BY_ORGAN
const API_ORGAN_POST_DEPARTMENT = import.meta.env.VITE_API_ORGAN_POST_DEPARTMENT;
const API_STORAGE_POST_ORGAN = import.meta.env.VITE_API_STORAGE_POST_ORGAN
const API_GET_WAREHOUSE_BY_ORGAN = import.meta.env.VITE_API_GET_WAREHOUSE_BY_ORGAN
const API_STORAGE_GET_WAREHOUSE = import.meta.env.VITE_API_STORAGE_GET_WAREHOUSE;
const KhaiBaoDanhMucAPIService = {
    getOrganById: async (id) => {
        const res = await axiosHttpService.get(API_STORAGE_GET_ORGAN + '/' + id);
        return res.data;
    },

    getDepartmentById: async (id) => {
        const res = await axiosHttpService.get(API_ORGAN_GET_DEPARTMENT + '/' + id);
        return res.data;
    },

    getDepartmentByOrganId: async (id) => {
        const res = await axiosHttpService.get(API_ORGAN_GET_DEPARTMENT_BY_ORGAN + '/' + id);
        return res.data;
    },

    updateDepartment: async (id, data) => {
        const res = await axiosHttpService.put(API_ORGAN_POST_DEPARTMENT + '/' + id, data);
        return res.data;
    },

    createDepartment: async (data) => {
        const res = await axiosHttpService.post(API_ORGAN_POST_DEPARTMENT, data);
        return res.data;
    },

    deleteOrgan: async (id) => {
        const res = await axiosHttpService.delete(API_STORAGE_POST_ORGAN + '/' + id);
        return res.data;
    },

    getWarehouseByOrganId: async (organId) => {
        const response = await axiosHttpService.get(API_GET_WAREHOUSE_BY_ORGAN + '/' + organId);
        return response.data;
    },

    getWarehouseById: async (id) => {
        const response = await axiosHttpService.get(API_STORAGE_GET_WAREHOUSE + '/' + id);
        return response.data;
    }

};

export default KhaiBaoDanhMucAPIService;
