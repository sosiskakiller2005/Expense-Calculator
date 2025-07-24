import { DateRangePicker } from "@heroui/date-picker";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import Filters from "@/components/Filters";
import ExpenseProps from "@/props/ExpenseProps";

export default function IndexPage() {
  const [expense, setExpenses] = useState<ExpenseProps[]>([]);
 
  return (
    <DefaultLayout>
      <div className="flex justify-between mb-4">
        <section className="flex flex-col gap-4">
          <h1 className={title()}>Ваши траты</h1>
          <Filters/>
          <div className="flex flex-col mt-4 gap-4">
            
          </div>
        </section>
        <section>
          <h1 className={title()}>Секция для графиков</h1>
        </section>
      </div>
    </DefaultLayout>
  );
}
