import { toast } from 'react-toastify';

export const GetKey = () => {
    return Math.random();
}

export const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

export const setUserInfo = (user) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
}
export const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    console.log(!userInfo);
    if (userInfo !== undefined && userInfo !== null) {
        console.log("returned", userInfo);
        return JSON.parse(userInfo); // Parse the userInfo from JSON string to object
    }
    return null;
}
