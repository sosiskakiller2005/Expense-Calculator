import ExpenseProps from "./ExpenseProps";

export default interface CreateExpenseFormProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    categories: { id: number; name: string }[];
    onCreate: (expense: ExpenseProps) => void;
  }