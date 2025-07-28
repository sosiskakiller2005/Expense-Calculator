using ExpenseCalculatorAPI.Models;

namespace ExpenseCalculatorAPI.Contracts
{
    public record GetExpensesRequest(string? SortItem, string? SortOrder, DateTime? startDate, DateTime? endDate, Category? selectedCategory, string? Comment, string? CategoryName);
}
