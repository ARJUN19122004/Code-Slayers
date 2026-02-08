import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const signup = async (data) => {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
};

export const login = async (data) => {
    const response = await axios.post(`${API_URL}/login`, data);

    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
};
