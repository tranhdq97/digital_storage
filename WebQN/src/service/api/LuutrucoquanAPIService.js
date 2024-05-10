import axiosHttpService from "src/utils/httpService";

const API_GET_WAREHOUSE_BY_ORGAN = import.meta.env.VITE_API_GET_WAREHOUSE_BY_ORGAN;
const API_GET_WAREHOUSE_ROOM_BY_WAREHOUSE = import.meta.env.VITE_API_GET_WAREHOUSE_ROOM_BY_WAREHOUSE;
const API_GET_SHELF_BY_WAREHOUSE_ROOM = import.meta.env.VITE_API_GET_SHELF_BY_WAREHOUSE_ROOM;
const API_GET_DRAWER_BY_SHELF = import.meta.env.VITE_API_GET_DRAWER_BY_SHELF;

const LuutrucoquanAPIService = {
    getWarehouseByOrganId: async (organId) => {
        const response = await axiosHttpService.get(API_GET_WAREHOUSE_BY_ORGAN + '/' + organId);
        return response.data;
    },

    getWarehouseRoomByWarehouseId: async (warehouseId) => {
        const response = await axiosHttpService.get(API_GET_WAREHOUSE_ROOM_BY_WAREHOUSE + '/' + warehouseId);
        return response.data;
    },

    getShelfByWarehouseRoomId: async (warehouseRoomId) => {
        const response = await axiosHttpService.get(API_GET_SHELF_BY_WAREHOUSE_ROOM + '/' + warehouseRoomId);
        return response.data;
    },

    getDrawerByShelfId: async (shelfId) => {
        const response = await axiosHttpService.get(API_GET_DRAWER_BY_SHELF + '/' + shelfId);
        return response.data;
    },
};

export default LuutrucoquanAPIService;
