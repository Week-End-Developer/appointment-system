import axios from 'axios';

const couponCodeService = {
    getCoupons: async () => {
        try {
            const response = await axios.get(`https://my-json-server.typicode.com/tahaakbulut/mock/coupons`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching coupons');
        }
    },
};

export default couponCodeService;
