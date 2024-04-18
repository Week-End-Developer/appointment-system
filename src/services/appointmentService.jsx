import axios from 'axios';

const appointmentService = {
    post: async (appointment) => {
        try {
            const response = await axios.post(`https://my-json-server.typicode.com/tahaakbulut/mock/appointments`, appointment);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },
    put: async (appointment) => {
        try {
            const response = await axios.get(`https://my-json-server.typicode.com/tahaakbulut/mock/appointments`, appointment);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },
    delete: async (appointment) => {
        try {
            const response = await axios.delete(`https://my-json-server.typicode.com/tahaakbulut/mock/appointments`,appointment);
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },
};

export default appointmentService;
