import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers['Content-Type'] = 'application/json-rpc';
axios.defaults.timeout = 20000;


axios.interceptors.response.use(
    response => {
        return response.data;
    });

export default axios;
