import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import months from "./months";
import "react-datepicker/dist/react-datepicker.css";
import MonthContext from "../context/MonthContext";
import YearContext from "../context/YearContext";
import ExpenseCategories from "./ExpenseCategories";
import { v4 as uuidv4 } from 'uuid';
import ExpenseContext from "../context/ExpenseContext";


function AddExpense({addExpenseClass, handleAddExpenseChange, updateMode, 
    updExpenseID, updExpenseName, updExpenseDate, updExpenseCategory, updExpenseAmount, updExpenseReason,
    setUpID, setUpName, setUpDate, setUpCategory, setUpAmount, setUpReason
    }){
    let {expenseList, setExpense} = useContext(ExpenseContext);
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    let [expenseDate, setExpenseDate] = useState(null);
    let [expenseName, setExpenseName] = useState("");
    let [expenseCategory, setExpenseCategory] = useState("Utilities");
    let [expenseAmount, setExpenseAmount] = useState("");
    let [expenseReason, setExpenseReason] = useState("");
    let submitter;
    function dateSelected(date){
        let stringDate = date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear();
        setExpenseDate(stringDate);
    }
    function amountKey(event){
        if((isNaN(event.key)||event.keyCode==32)&&!((event.key==="Backspace")||(event.key==="Delete")||(event.keyCode==37||event.keyCode==39)||(event.keyCode==190))){
            event.preventDefault();
        }
        if(expenseAmount.includes(".")&&event.keyCode==190){
            event.preventDefault();
        }
    }
    function submitNewExpense(){
        let tempExpense = JSON.parse(localStorage.getItem("Expenses"));
        let targetIndex = tempExpense.findIndex((element)=>element.period==selectedMonth+"-"+selectedYear)
        switch(submitter){
            case 1:
                let newExpense = {"id":uuidv4(), "expenseName":expenseName, "date":expenseDate, "category":expenseCategory, "amount":Number(expenseAmount), "reason":expenseReason};
                tempExpense[targetIndex].expenses.push(newExpense);
                localStorage.setItem("Expenses", JSON.stringify(tempExpense));
                handleAddExpenseChange();
                setExpenseName("");
                setExpenseDate(null);
                setExpenseCategory("Utilities");
                setExpenseAmount("");
                setExpenseReason("");
                setExpense(tempExpense);
            break;
            case 2:
                let replaceExpense = {"id":updExpenseID, "expenseName":expenseName, "date":expenseDate, "category":expenseCategory, "amount":Number(expenseAmount), "reason":expenseReason};
                let replaceIndex = tempExpense[targetIndex].expenses.findIndex((element)=>element.id==updExpenseID)
                tempExpense[targetIndex].expenses[replaceIndex]=replaceExpense;
                localStorage.setItem("Expenses", JSON.stringify(tempExpense));
                setExpenseName("");
                setExpenseDate(null);
                setExpenseCategory("Utilities");
                setExpenseAmount("");
                setExpenseReason("");
                setExpense(tempExpense);
                setUpID("");
                setUpName("");
                setUpDate(new Date());
                setUpCategory("Utilities")
                setUpAmount("");
                setUpReason("");
            break;


        }

    }
    useEffect(()=>{
        if(updateMode==true){
            setExpenseName(updExpenseName);
            dateSelected(updExpenseDate);
            setExpenseCategory(updExpenseCategory);
            setExpenseAmount(String(updExpenseAmount));
            setExpenseReason(updExpenseReason);
        }
    },[updExpenseID]);
    function updateExpense(){

    }
    return(
        <div className={addExpenseClass}>
            <h2 className="addEditTitle">{updateMode?"Update Expense":"Add Expense"}</h2>
            <form className="addExpenseForm" onSubmit={e=>{e.preventDefault();submitNewExpense();}}>
            <label>Expense Name</label>
            <input type="text" placeholder="Bananas or something" value={expenseName} onChange={(event)=>{setExpenseName(event.target.value)}} required className="addInputField"></input>
            <label>Date</label>
            <DatePicker
                selected={expenseDate}
                onChange={(date) => {dateSelected(date)}}
                minDate={new Date(selectedMonth+"-1-"+selectedYear)}
                maxDate={new Date(months[months.findIndex((element)=>element==selectedMonth)+1]+"-0-"+selectedYear)}
                placeholderText="Select a date within the month" 
                className="addInputField"
                required
            />
            <label>Category</label>
            <select value={expenseCategory} onChange={(event)=>{setExpenseCategory(event.target.value)}} required className="addInputField">
                {ExpenseCategories.map((element, i)=><option key={i}>{element}</option>)}
            </select>
            <label>Amount</label>
            <input type="text" placeholder="50.00" step="0.01" min="0" value={expenseAmount} onKeyDown={(event)=>{amountKey(event)}} onChange={(event)=>{setExpenseAmount(event.target.value)}} required className="addInputField"></input>
            <label>Reason/Explanation</label>
            <input type="text" placeholder="Explain the expense" value={expenseReason} onChange={(event)=>{setExpenseReason(event.target.value)}} required className="addInputField"></input>
            {!updateMode &&
                <button className="addExpenseButton roundCorner MaterialShadow" onClick={()=>submitter=1}>Add new expense</button>
            }
            {updateMode &&
                <button className="addExpenseButton roundCorner MaterialShadow" onClick={()=>submitter=2}>Update Expense</button>
            }
            </form>
        </div>
    );
}
export default AddExpense;