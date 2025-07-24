import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { title } from "@/components/primitives";
import ExpenseProps from "@/props/ExpenseProps";


export default function Expense({id, amount, datetime, comment, category}: ExpenseProps) {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <h1 className={title({size: 'sm'})}>{category?.name}, {amount}</h1>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{comment}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <p>{datetime.toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    )
}