import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://tastetrail-server-one.vercel.app',
});

const useAxios = () => {
    return axiosInstance
};

export default useAxios;