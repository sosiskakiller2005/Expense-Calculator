import ExpenseProps from "@/props/ExpenseProps";
import axios from "axios";

export const postExpense = async (expense: ExpenseProps) => {
    try {
        axios.post(`${import.meta.env.VITE_DATABASE_URL}/Expenses`, {
            params: {
                amount: expense.amount,
                dateTime: expense.dateTime.toDateString(),
                comment: expense.comment || "",
                categoryId: expense.category?.id
            }
        })
        console.log("✅ Трата успешно создана:", expense);
    } catch (error) {
        console.error("❌ Ошибка при создании траты:", error);
        return false;
    }
}