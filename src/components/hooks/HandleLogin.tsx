import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_PUBLIC_API_URL;

interface LoginResponse {
    message: string;
}

export const handleLogin = async (email: string, password: string) => {
    try {
        //console.log("Base URL:", baseURL);
        const response = await axios.post<LoginResponse>(`${baseURL}/login`, { email, password }, { withCredentials: true });
        //console.log(response.data.message);
        if (response.data.message === 'Login successful') {
            const userResponse = await axios.get(`${baseURL}/get_current_user`, { withCredentials: true });
            return userResponse.data; 
        } else if (response.data.message === 'Account is inactive') {
            return response.data;
        }
    } catch (error) {
        //console.error('Login failed:', error);
        throw error;
    }
};

export const handleLoginAfterActivation = async (email: string, password: string) => {
    try {
        //console.log("Base URL:", baseURL);
        const response = await axios.post<LoginResponse>(`${baseURL}/login_after_activation`, { email, password }, { withCredentials: true });
        //console.log(response.data.message);
        if (response.data.message === 'Login successful') {
            const userResponse = await axios.get(`${baseURL}/get_current_user`, { withCredentials: true });
            return userResponse.data; 
        } else if (response.data.message === 'Account is inactive') {
            return response.data;
        }
    } catch (error) {
        //console.error('Login failed:', error);
        throw error;
    }
};
