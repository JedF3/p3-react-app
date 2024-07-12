import { createContext } from "react";

const ExpenseContext = createContext({expenseData:{}, setExpenseData:()=>{}});

export default ExpenseContext;