export default interface ExpenseProps {
    id:number;
    amount: number;
    datetime: Date;
    comment?: string;
    category?: {
        id: number;
        name: string;
    };
}