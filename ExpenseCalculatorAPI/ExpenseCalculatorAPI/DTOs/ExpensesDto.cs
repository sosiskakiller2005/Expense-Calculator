using ExpenseCalculatorAPI.Models;

namespace ExpenseCalculatorAPI.DTOs
{
    public record ExpenseDto(int Id, decimal Amount, Category Category, DateTime DateTime);
}
