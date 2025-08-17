import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import ExpenseProps from "@/props/ExpenseProps";
import { getExpenses } from "@/services/getExpenses";
import Expense from "@/components/Expense";
import CategoryProps from "@/props/CategoryProps";
import { getCategories } from "@/services/getCategories";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import CreateExpenseForm from "@/components/CreateExpenseForm";
import { postExpense } from "@/services/postExpense";

export default function IndexPage() {
  // логика работы с данными
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
  const [filter, setFilter] = useState({
    categoryName: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });
  useEffect(() => {
    const getData = async () => {
      const expenses = await getExpenses({
        ...filter,
        startDate: filter.startDate || new Date(0),
        endDate: filter.endDate || new Date(),
      });
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onCreate = async (expense: ExpenseProps) => {
    await postExpense(expense);
    const expenses = await getExpenses({
      ...filter,
      startDate: filter.startDate || new Date(0),
      endDate: filter.endDate || new Date(),
    });
    setExpenses(expenses);
  }

  return (
    <DefaultLayout>
      <div className="flex justify-between mb-4">
        <section className="flex flex-col gap-4">
          <h1 className={title()}>Ваши траты</h1>
          <Button onPress={onOpen} className="w-1/2">Добавить трату</Button>
          <CreateExpenseForm
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            categories={categories}
            onCreate={onCreate}
          />
          <Filters onCategoryChange={(name) => setFilter((prev) => ({ ...prev, categoryName: name }))}
            onDateChange={(start, end) => setFilter((prev) => ({ ...prev, startDate: start, endDate: end }))} />
          <ul className="flex flex-col mt-4 gap-4">
            {expenses.map((e) => {
              return (
                <li key={e.id}>
                  <Expense id={e.id} amount={e.amount} dateTime={e.dateTime} comment={e.comment} category={e.category} categoryName={e.categoryName} />
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