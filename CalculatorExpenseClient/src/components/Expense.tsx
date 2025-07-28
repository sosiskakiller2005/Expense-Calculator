import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import ExpenseProps from "@/props/ExpenseProps";


export default function Expense({ id, amount, dateTime, comment, category }: ExpenseProps) {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <h1 className='font-bold text-lg'>{category?.name}, {amount}</h1>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{comment}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <p>{dateTime ? new Date(dateTime).toLocaleDateString() : "—"}</p>
            </CardFooter>
        </Card>
    )
}