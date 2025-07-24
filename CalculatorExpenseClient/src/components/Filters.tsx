import CategoryProps from "@/props/CategoryProps";
import { DateRangePicker } from "@heroui/date-picker";
import { Select, SelectSection, SelectItem } from "@heroui/react";
import { useState } from "react";

export default function Filters(){
    const [category, setCategory] = useState<CategoryProps[]>([]);
    const categories = [
        {key: "cat", label: "Продукты"},
        {key: "dog", label: "Аптека"},
        {key: "elephant", label: "Одежда"},
        {key: "lion", label: "Такси"},
      ];
    return(
        <div className="flex gap-4 min-w-lg">
            <DateRangePicker
              showMonthAndYearPickers
              firstDayOfWeek="mon"
              label="Выбранный период"
              visibleMonths={2}
            />
            <Select label='Категории' placeholder="Выберите категории" selectionMode="multiple">
                {categories.map((category) => (
                    <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
            </Select>
        </div>
    )
}