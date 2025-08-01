import CategoryProps from "@/props/CategoryProps";
import { getCategories } from "@/services/getCategories";
import { DateRangePicker } from "@heroui/date-picker";
import { Select, SelectSection, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import FilterProps from "@/props/FilterProps";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";

export default function Filters({ onCategoryChange }: FilterProps) {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    useEffect(() => {
        const getData = async () => {
            const categories = await getCategories();
            console.log("Полученные категории:", categories);
            setCategories(categories ?? []);
        }
        getData();
    }, []);

    return (
        <div className="flex gap-4 min-w-lg">
            <DateRangePicker
                showMonthAndYearPickers
                firstDayOfWeek="mon"
                label="Выбранный период"
                visibleMonths={2}
                maxValue={today(getLocalTimeZone())}
            />
            <Select label='Категории' placeholder="Выберите категории" isClearable={true} onSelectionChange={
                (keySet) => {
                    const selectedKey = Array.from(keySet)[0]; // достаём выбранный ключ
                    const selectedCategory = categories.find((c) => c.id.toString() === selectedKey);
                    onCategoryChange(selectedCategory?.name || "");
                }
            }>
                {categories?.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
            </Select>
        </div>
    )
}