import axios from "axios";

export const getCategories = async () => {
    try {
        const dbURL = import.meta.env.VITE_DB_URL;
        const response = await axios.get(`${dbURL}/category`);

        return response.data.categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};
