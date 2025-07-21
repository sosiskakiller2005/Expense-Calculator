using System;
using System.Collections.Generic;

namespace ExpenseCalculatorAPI.Models;

public partial class Expense
{
    public int Id { get; set; }

    public decimal Amount { get; set; }

    public int CategoryId { get; set; }

    public DateTime DateTime { get; set; }

    public virtual Category Category { get; set; } = null!;
}
