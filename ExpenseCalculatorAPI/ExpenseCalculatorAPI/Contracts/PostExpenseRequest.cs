using ExpenseCalculatorAPI.Models;

namespace ExpenseCalculatorAPI.Contracts
{
    public record PostExpenseRequest(decimal Amount, DateTime DateTime, int CategoryId);
}
