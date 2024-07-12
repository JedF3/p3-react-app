import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import SummaryPanel from "./SummaryPanel";
import MonthExpensePieChart from "./MonthExpensePieChart";
import AddExpense from "./AddExpense";
import DateYearDropdown from "./DateYearDropdown";
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

function CurrentMonthExpense(){
    let {setTitle}=useOutletContext();
    let addExpenseClassShow = "whiteMaterial MaterialShadow roundCorner show addItem";
    let addExpenseClassHide = "whiteMaterial MaterialShadow roundCorner hide addItem";
    let [shadeClass, setShadeClass] = useState("shade hide"); 
    let [addExpenseClass, setAddExpenseClass] = useState("whiteMaterial MaterialShadow roundCorner hide addItem");
    useEffect(()=>{setTitle("Monthly Expenses")},[]);

    function handleAddExpenseChange(){
        if (addExpenseClass.includes("hide")){
            setShadeClass("shade show");
            setAddExpenseClass(addExpenseClassShow);
        }
        else{
            setShadeClass("shade hide");
            setAddExpenseClass(addExpenseClassHide);
        }
    }

    console.log("rerender");
    return (
        <div className="contents reducedTop">
            <DateYearDropdown/>
            <div className="whiteMaterial MaterialShadow roundCorner ExpenseAnalysis monthlyViewAnalysis">
                <MonthExpensePieChart/>
            </div>
            <div className="ExpenseSummary">               
                <button className="addExpenseButton whiteMaterial MaterialShadow roundCorner" onClick={()=>{handleAddExpenseChange()}}>Add Expense</button>
            </div>
                <SummaryPanel/>
            <div className={shadeClass} onClick={()=>{handleAddExpenseChange()}}></div>
            <AddExpense addExpenseClass={addExpenseClass} handleAddExpenseChange={handleAddExpenseChange} updateMode={false}/>
        </div>
    );
}
export default CurrentMonthExpense;