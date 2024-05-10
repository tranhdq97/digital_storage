import axios from "axios"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const axiosHttpService = axios.create({
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
})

const axiosCrossDomainHttpService = axios.create({
    withCredentials: false
});

export {axiosHttpService};

export default axiosCrossDomainHttpService
