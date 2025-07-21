using ExpenseCalculatorAPI.DTOs;

namespace ExpenseCalculatorAPI.Contracts
{
    public record GetExpensesResponse(List<ExpenseDto> Expenses);
}
