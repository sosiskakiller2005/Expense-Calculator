import axios from "axios";

export const getCategories = async () => {
    try {
        const dbURL = import.meta.env.VITE_DATABASE_URL ;
        const response = await axios.get(`${dbURL}/Category`);
        console.log("📦 Ответ от сервера:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};
