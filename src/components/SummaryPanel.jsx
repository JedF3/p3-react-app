import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import getCurrentMonthYear, { currentMonth, currentYear } from './getCurrentMonthYear';
import ExpenseContext from '../context/ExpenseContext';
import { v4 as uuidv4 } from 'uuid';
import MonthContext from '../context/MonthContext';
import YearContext from '../context/YearContext';
import AddExpense from './AddExpense';
import RevenueContext from '../context/RevenueContext';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);

function SummaryPanel(){
    let firstRender = useRef(true);
    let addRender = useRef(false);
    let {expenseList, setExpense} = useContext(ExpenseContext);
    let {revenueList, setRevenue} = useContext(RevenueContext);
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    let {addPeriod} = useOutletContext();
    let sampleExpenses = [{"id":uuidv4(), "expenseName":"Sample Expense(Edit this on use)", "date":"05", "category":"Food", "amount":10000.00, "reason":"Food"}
    ];
    let sampleRevenue = [{"id":uuidv4(), "revenueName":"Sample Revenue(Edit this on use)", "date":"05-04-2024", "category":"Salary", "amount":10000.00, "remarks":"Just your usual salary"}
    ];
    let addExpenseClassShow = "whiteMaterial MaterialShadow roundCorner show updItem";
    let addExpenseClassHide = "whiteMaterial MaterialShadow roundCorner hide updItem";
    let [shadeClass, setShadeClass] = useState("shade hide"); 
    let [addExpenseClass, setAddExpenseClass] = useState("whiteMaterial MaterialShadow roundCorner hide addItem");
    let [updateExpenseID, setUpdateExpenseID] = useState("");
    let [updateExpenseName, setUpdateExpenseName] = useState("");
    let [updateExpenseCategory, setUpdateExpenseCategory] = useState("");
    let [updateExpenseDate, setUpdateExpenseDate] = useState(new Date());
    let [updateExpenseAmount, setUpdateExpenseAmount] = useState("");
    let [updateExpenseReason, setUpdateExpenseReason] = useState("");

    const [rowData, setRowData] = useState([]);
        
        // Column Definitions: Defines the columns to be displayed.
        const [colDefs, setColDefs] = useState([
        { headerName:"ID", field: "id", filter:true, floatingFilter:true, hide:true, suppressToolPanel:true },
        { headerName:"Expense Name", field: "expenseName", filter:true, floatingFilter:true},
        { headerName:"Category", field: "category", filter:true, floatingFilter:true },
        { headerName:"Date", field: "date", filter:true, floatingFilter:true },
        { headerName:"Amount", field: "amount", filter:true, floatingFilter:true },
        { headerName:"Reason", field: "reason", filter:true, floatingFilter:true }
        ]);
    let tempExpenseData = JSON.parse(localStorage.getItem("Expenses"));
    let tempRevenueData = JSON.parse(localStorage.getItem("Revenue"));
    useEffect(()=>{
        if (firstRender.current&&tempExpenseData==null){
            tempExpenseData = [{"period":selectedMonth+"-"+selectedYear, "expenses":sampleExpenses}];
            tempRevenueData = [{"period":selectedMonth+"-"+selectedYear, "revenue":sampleRevenue}];
            localStorage.setItem("Expenses", JSON.stringify(tempExpenseData));
            localStorage.setItem("Revenue", JSON.stringify(tempRevenueData));
            setExpense(tempExpenseData);
            setRevenue(tempRevenueData);
        }
        if (firstRender.current&&!(tempExpenseData==null)){
            setExpense(tempExpenseData);
            setRevenue(tempRevenueData);
        }
        if(!firstRender.current){
            setRowData(expenseList.find((element)=>element.period==selectedMonth+"-"+selectedYear).expenses);
        }
    }, [expenseList]);
    useEffect(()=>{
        if(!firstRender.current){
            try{
                setRowData(expenseList.find((element)=>element.period==selectedMonth+"-"+selectedYear).expenses);
            }
            catch{
                addPeriod();
            }
        }
        firstRender.current=false;
    },[selectedMonth, selectedYear]);


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
    function summaryRowClicked(event=null){
        // handleAddExpenseChange();
        if (addExpenseClass.includes("hide")){
            let selectedExpense = event.data;
            setUpdateExpenseID(selectedExpense.id);
            setUpdateExpenseName(selectedExpense.expenseName);
            setUpdateExpenseDate(new Date(selectedExpense.date));
            setUpdateExpenseCategory(selectedExpense.category);
            setUpdateExpenseAmount(Number(selectedExpense.amount));
            setUpdateExpenseReason(selectedExpense.reason);
            addRender.current=true;
        }
        else{
            setUpdateExpenseID("");
            setUpdateExpenseName("");
            setUpdateExpenseDate(new Date());
            setUpdateExpenseCategory("Utilities");
            setUpdateExpenseAmount("");
            setUpdateExpenseReason("");
        }

    }
    useEffect(()=>{
        if(addRender.current){
            handleAddExpenseChange();
        }
    },[updateExpenseID]);
    return(
        <div className="whiteMaterial MaterialShadow roundCorner ExpenseSummary preventBottom">
             <div
                className="ag-theme-quartz" // applying the grid theme
                style={{ height: "auto"}} // the grid will fill the size of the parent container
                >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    domLayout='autoHeight'
                    onRowClicked={(event)=>summaryRowClicked(event)}
                />
            </div>
            <div className={shadeClass} onClick={()=>{summaryRowClicked()}}></div>
            <AddExpense addExpenseClass={addExpenseClass} 
            handleAddExpenseChange={handleAddExpenseChange} 
            updateMode={true}
            updExpenseID={updateExpenseID}
            updExpenseName={updateExpenseName}
            updExpenseDate={updateExpenseDate}
            updExpenseCategory={updateExpenseCategory}
            updExpenseAmount={updateExpenseAmount}
            updExpenseReason={updateExpenseReason}
            setUpID={setUpdateExpenseID}
            setUpName={setUpdateExpenseName}
            setUpDate={setUpdateExpenseDate}
            setUpCategory={setUpdateExpenseCategory}
            setUpAmount={setUpdateExpenseAmount}
            setUpReason={setUpdateExpenseReason}
            />
        </div>
    );
}
export default SummaryPanel;