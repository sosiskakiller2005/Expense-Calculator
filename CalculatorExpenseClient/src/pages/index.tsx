import { DateRangePicker } from "@heroui/date-picker";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useCallback, useEffect, useState } from "react";
import Filters from "@/components/Filters";
import ExpenseProps from "@/props/ExpenseProps";
import { getExpenses } from "@/services/getExpenses";
import Expense from "@/components/Expense";
import CategoryProps from "@/props/CategoryProps";
import { getCategories } from "@/services/getCategories";

export default function IndexPage() {
  // логика работы с данными
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
  const [filter, setFilter] = useState({
    categoryName: ''
  });
  useEffect(() => {
    const getData = async () => {
      const expenses = await getExpenses(filter);
      setExpenses(expenses);
    }

    getData();
  }, [filter]);

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories();
      setCategories(categories);
    }

    getData();
  }, []);
  const handleCategoryChange = useCallback((name: string) => {
    setFilter({categoryName: name});
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-between mb-4">
        <section className="flex flex-col gap-4">
          <h1 className={title()}>Ваши траты</h1>
          <Filters onCategoryChange={(name) => setFilter({categoryName: name})}/>
            <ul className="flex flex-col mt-4 gap-4">
              {expenses.map((e) => {
                return (
                  <li key={e.id}>
                    <Expense id={e.id} amount={e.amount} dateTime={e.dateTime} comment={e.comment} category={e.category} categoryName={e.categoryName}/>
                  </li>
                )
              })}
            </ul>
        </section>
        <section>
          <h1 className={title()}>Секция для графиков</h1>
        </section>
      </div>
    </DefaultLayout>
  );
}