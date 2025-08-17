import axios from "axios";

export const getExpenses = async (filter: { categoryName: string, startDate: Date, endDate: Date }) => {
    try {
      const dbURL = import.meta.env.VITE_DATABASE_URL;
  
      console.log("🔍 Отправляем фильтр:", filter);
  
      const response = await axios.get(`${dbURL}/Expenses`, {
        params: {
          categoryName: filter?.categoryName,
          startDate: filter.startDate ? filter.startDate.toISOString() : undefined,
          endDate: filter.endDate ? filter.endDate.toISOString() : undefined,
        }
      });
  
      console.log("📦 Ответ от сервера:", response.data);
  
      return response.data?.expenses ?? [];
    } catch (error) {
      console.error("❌ Ошибка при получении расходов:", error);
      return [];
    }
  };
  
