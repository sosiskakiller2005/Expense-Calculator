using ExpenseCalculatorAPI.Contracts;
using ExpenseCalculatorAPI.DTOs;
using ExpenseCalculatorAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ExpenseCalculatorAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExpensesController : Controller
    {
        private readonly ExpenseCalculatorDbContext _context;
        public ExpensesController(ExpenseCalculatorDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses([FromQuery] GetExpensesRequest request)
        {
            var expensesQuery = Enumerable.Empty<Expense>().AsQueryable(); // инициализация пустым запросом
            if (request.selectedCategory != null)
            {
                if (request.endDate != null && request.startDate != null)
                {
                    expensesQuery = _context.Expenses.Where(e => e.Category == request.selectedCategory && e.DateTime <= request.endDate && e.DateTime >= request.startDate);
                }
                else
                {
                    expensesQuery = _context.Expenses.Where(e => e.Category == request.selectedCategory);
                }
            }
            else
            {
                if (request.endDate != null && request.startDate != null)
                {
                    expensesQuery = _context.Expenses.Where(e => e.DateTime <= request.endDate && e.DateTime >= request.startDate);
                }
                else
                {
                    expensesQuery = _context.Expenses;
                }
            }

            Expression<Func<Expense, object>> selectorKey = request.SortItem?.ToLower() switch
            {
                "amount" => e => e.Amount,
                "category" => e => e.Category.Name,
                "date" => e => e.DateTime,
                _ => e => e.Id
            };
            expensesQuery = request.SortOrder == "desc" ?
                expensesQuery.OrderByDescending(selectorKey) :
                expensesQuery.OrderBy(selectorKey);

            var expensesDtos = await expensesQuery
                .Select(e => new ExpenseDto(e.Id, e.Amount, e.Category, e.DateTime))
                .ToListAsync();

            return Ok(new GetExpensesResponse(expensesDtos));
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody] PostExpenseRequest request)
        {
            if (request == null || request.Amount <= 0 || request.CategoryId <= 0)
            {
                return BadRequest("Invalid expense data.");
            }
            var category = await _context.Categories.FindAsync(request.CategoryId);
            if (category == null)
            {
                return NotFound("Category not found.");
            }
            var newExpense = new Expense
            {
                Amount = request.Amount,
                Category = category,
                DateTime = DateTime.UtcNow
            };
            _context.Expenses.Add(newExpense);
            await _context.SaveChangesAsync();
            return Ok(new PostExpenseDto(newExpense.Id, newExpense.Amount, newExpense.CategoryId, newExpense.DateTime));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound("Expense not found.");
            }
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}