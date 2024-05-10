import axios from "axios"

const axiosCorsService = axios.create({
    withCredentials: false
});

const axiosHttpService = axios.create({
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
})

export { axiosCorsService };
export default axiosHttpService
