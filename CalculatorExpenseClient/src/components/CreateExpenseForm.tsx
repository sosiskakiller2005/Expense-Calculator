import { Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, ModalHeader, NumberInput, Select, SelectItem, Textarea } from "@heroui/react";
import { FaCoins } from "react-icons/fa";
import { getLocalTimeZone, today } from "@internationalized/date";
import CreateExpenseFormProps from "@/props/CreateExpenseFormProps";
import ExpenseProps from "@/props/ExpenseProps";
import { useState } from "react";

export default function CreateExpenseForm({ isOpen, onOpenChange, categories, onCreate }: CreateExpenseFormProps) {

  const [expense, setExpense] = useState({
    amount: null as number | null,
    dateTime: null as DateValue | null,
    comment: '',
    category: null as { id: number; name: string } | null,
  });
  const onClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!expense.amount || !expense.dateTime || !expense.category) {
      alert("Пожалуйста, заполните все обязательные поля." + expense.amount + expense.dateTime + expense.category + expense.comment);
      return;
    }
    const newExpense: ExpenseProps = {
      amount: expense.amount,
      dateTime: expense.dateTime ? expense.dateTime.toDate(getLocalTimeZone()) : new Date(),
      comment: expense.comment,
      category: expense.category,
    };
    onCreate(newExpense);
    setExpense({
      amount: null as number | null,
      dateTime: null,
      comment: '',
      category: null,
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              Создание новой траты
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
               
              <DatePicker value={expense.dateTime}
                onChange={(value) => setExpense({ ...expense, dateTime: value })}
                showMonthAndYearPickers
                firstDayOfWeek="mon"
                label="Выбранная дата"
                visibleMonths={1}
                maxValue={today(getLocalTimeZone())} />
              <Select
                selectedKeys={expense.category ? [expense.category.id.toString()] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string | undefined;
                  const category = categories.find(c => c.id.toString() === selectedKey) ?? null;
                  setExpense({ ...expense, category });
                }}
                label="Категории"
                placeholder="Выберите категорию"
                isClearable
              >
                {categories?.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
              <Textarea value={expense.comment || ''}
                onChange={(e) => setExpense({ ...expense, comment: e.target.value })}
                label="Комментарий"
                placeholder="Введите комментарий"
                rows={4}
              />
              <Button className="mb-4" onClick={onClick}>Создать</Button>
            </ModalBody>
          </>
        )}

      </ModalContent>
    </Modal>
  )
}