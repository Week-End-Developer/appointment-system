import axios from 'axios';

const doctorService = {
  getDoctors: async () => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/tahaakbulut/mock/doctors`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching doctors');
    }
  },

  getDoctorDetail: async (id) => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/tahaakbulut/mock/doctor-detail/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching doctor detail');
    }
  },
};

export default doctorService;
