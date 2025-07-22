namespace ExpenseCalculatorAPI.DTOs
{
    public record PostExpenseDto(int Id, decimal Amount, int CategoryId, DateTime DateTime);

}
