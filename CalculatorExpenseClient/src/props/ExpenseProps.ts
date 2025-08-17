export default interface ExpenseProps {
    id?:number;
    amount: number;
    dateTime: Date;
    comment?: string;
    category?: {
        id: number;
        name: string;
    };
    categoryName?: string;
}