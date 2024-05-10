import { ENUM_TYPE_PLAN } from "src/storage/Storage";
import axiosHttpService from "src/utils/httpService";
const API_PLAN = import.meta.env.VITE_API_PLAN;
const API_GET_FILE_BY_PLAN_NNLS_ID = import.meta.env.VITE_API_GET_FILE_BY_PLAN_NNLS_ID;
const API_REMOVE_FILE_FROM_PLAN = import.meta.env.VITE_API_REMOVE_FILE_FROM_PLAN;
const API_SET_PLAN_FOR_FILE = import.meta.env.VITE_API_SET_PLAN_FOR_FILE;
const API_SET_PLAN_TIEU_HUY_FOR_FILE = import.meta.env.VITE_API_SET_PLAN_TIEU_HUY_FOR_FILE;
const API_GET_FILE_BY_PLAN_TIEUHUY_ID = import.meta.env.VITE_API_GET_FILE_BY_PLAN_TIEUHUY_ID;
const PlanAPIService = {
    getPlanById: async (id) => {
        const response = await axiosHttpService.get(API_PLAN + '/' + id);
        return response.data;
    },

    updateStatePlan: async (id, newState) => {
        const plan = await PlanAPIService.getPlanById(id);
        plan["state"] = newState;
        const response = await axiosHttpService.put(API_PLAN + '/' + id, plan);
        return response.data;
    },

    getFileByPlanNLLSId: async (id) => {
        const response = await axiosHttpService.get(API_GET_FILE_BY_PLAN_NNLS_ID + id);
        return response;
    },

    getFileByPlanTieuHuyId: async (id) => {
        const response = await axiosHttpService.get(API_GET_FILE_BY_PLAN_TIEUHUY_ID + id);
        return response;
    },

    removeFileFromPlan: async (idFile) => {
        const response = await axiosHttpService.post(API_REMOVE_FILE_FROM_PLAN, {
            gov_file_id: idFile
        });
        return response;
    },

    setPlanForFile: async (payload) => {
        const response = await axiosHttpService.post(API_SET_PLAN_FOR_FILE , payload);
        return response;
    },

    setPlanTieuHuyForFile: async (payload) => {
        const response = await axiosHttpService.post(API_SET_PLAN_TIEU_HUY_FOR_FILE , payload);
        return response;
    },

    getDeletePlan: async () => {
        const response = await axiosHttpService.get(API_PLAN);
        return response.data.filter((plan) => plan.type === ENUM_TYPE_PLAN.QUYET_DINH_TIEU_HUY);
    },

    createPlan: async (payload) => {
        const response = await axiosHttpService.post(API_PLAN, payload);
        return response.data;
    },

}

export default PlanAPIService;
