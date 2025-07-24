import axios from "axios";

export const getExpenses= async () => {
    try {
        const dbURL = import.meta.env.VITE_DB_URL;
        const response = await axios.get(`${dbURL}/expense`);

        return response.data.expenses;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};
