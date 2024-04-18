import axios from 'axios';

const petService = {
    getPets: async () => {
        try {
            const response = await axios.get(`https://my-json-server.typicode.com/tahaakbulut/mock/pets`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching pets');
        }
    },
};

export default petService;
