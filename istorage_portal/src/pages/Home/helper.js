import axiosCrossDomainHttpService, {axiosHttpService} from "src/utils/httpService";

const API_USERINFO = import.meta.env.VITE_API_PORTAL_USERINFO

export const GetUserInfo = async () => {
    try{
        const response = await axiosHttpService.get(API_USERINFO);
        return response.data.user;
    }catch(err){
        console.log(err);
        return null;
    }
}
