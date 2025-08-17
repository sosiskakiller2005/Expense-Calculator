export default interface FilterProps {
    onCategoryChange: (categoryName: string) => void;
    onDateChange: (startDate?: Date, endDate?: Date) => void;
}