import UserAPIService from "./service/api/userAPIService";

const InitApp = {
    initUserInfo: async () =>{
        const userInfo = await UserAPIService.getUserInfo();
        return userInfo;
    }
};

export default InitApp;
