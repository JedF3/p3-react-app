import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import SidePanel from "./SidePanel";
import { Link } from "react-router-dom";
import ExpenseContext from "../context/ExpenseContext";
import RevenueContext from "../context/RevenueContext";
import MonthContext from "../context/MonthContext";
import YearContext from "../context/YearContext";
import months from "./months";
import { currentYear } from "./getCurrentMonthYear";

function TitleBar(){
    let [title, setTitle] = useState("Expense Tracker");
    let [panelClass, setPanelClass] = useState("Sidepanel hide");
    let [burgerClass, setBurgerClass] = useState("hamburger");
    let [shadeClass, setShadeClass] = useState("shade hide"); 
    let {expenseList, setExpense} = useContext(ExpenseContext);
    let {revenueList, setRevenue} = useContext(RevenueContext);
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    let newExpensePeriod = {"period":selectedMonth+"-"+selectedYear, "expenses":[]};
    let newRevenuePeriod = {"period":selectedMonth+"-"+selectedYear, "revenue":[]};
    let selectedMonthIndex = months.findIndex((item)=>item==selectedMonth);
    let insertIndex=-1;
    let insertYear=false;
    let newExpenseList;
    let newRevenueList;
    let tempExpenseData = JSON.parse(localStorage.getItem("Expenses"));
    let tempRevenueData = JSON.parse(localStorage.getItem("Revenue"));
    function burgerClick(){
        if(!burgerClass.includes("change")){
            setBurgerClass("hamburger change");
            setShadeClass("shade show");
            setPanelClass("Sidepanel MaterialShadow show panelAnimationIn");
        }
        else{
            setBurgerClass("hamburger");
            setShadeClass("shade hide");
            setPanelClass("Sidepanel MaterialShadow panelAnimationOut");
        }
    }
    useEffect(()=>{
        
    },[panelClass]);
    useEffect(()=>{
        setExpense(JSON.parse(localStorage.getItem("Expenses")));
        setRevenue(JSON.parse(localStorage.getItem("Revenue")));
       },[]);
       function addPeriod(){
        for(let i=0; i<expenseList.length;i++ ){
            if(expenseList[i].period.slice(expenseList[i].period.indexOf("-")+1)==selectedYear){
                insertYear=true;
                if(selectedMonthIndex<months.findIndex((item)=>item==expenseList[i].period.slice(0,expenseList[i].period.indexOf("-")))){
                    insertIndex=i;
                    break;
                }
                if((selectedYear!=currentYear)&&(selectedMonthIndex<months.findIndex((item)=>item==expenseList[i].period.slice(0,expenseList[i].period.indexOf("-"))))){
                    insertIndex=i;
                    break;
                }
                if((selectedYear!=currentYear)&&(selectedMonthIndex>months.findIndex((item)=>item==expenseList[i].period.slice(0,expenseList[i].period.indexOf("-")))&&
                Number(expenseList[i+1].period.slice(expenseList[i+1].period.indexOf("-")+1))>Number(selectedYear))){
                    insertIndex=i+1;
                    break;
                }
            }
        }
        if(insertYear){
            if(insertIndex!=-1){
                if(expenseList.length==1){
                    tempExpenseData.unshift(newExpensePeriod);
                    newExpenseList=tempExpenseData;
                    tempRevenueData.unshift(newRevenuePeriod);
                    newRevenueList=tempRevenueData;
                }
                else{
                    newExpenseList = [...expenseList.slice(0,insertIndex), newExpensePeriod, ...expenseList.slice(insertIndex)];
                    newRevenueList = [...revenueList.slice(0,insertIndex), newRevenuePeriod, ...revenueList.slice(insertIndex)];
                }
                localStorage.setItem("Expenses", JSON.stringify(newExpenseList));
                localStorage.setItem("Revenue", JSON.stringify(newRevenueList));
                setExpense(newExpenseList);
                setRevenue(newRevenueList);
            }
            else{
                alert("Cannot select future month");
            }
        }
        else{
            for(let i=0; i<expenseList.length;i++ ){
                    if(Number(selectedYear)<Number(expenseList[i].period.slice(expenseList[i].period.indexOf("-")+1))){
                        insertIndex=i;
                        break;
                    }
            }
            if(insertIndex!=-1){
                if(expenseList.length==1){
                    tempExpenseData.unshift(newExpensePeriod);
                    newExpenseList=tempExpenseData;
                    tempRevenueData.unshift(newRevenuePeriod);
                    newRevenueList=tempRevenueData;
                }
                else{
                    newExpenseList = [...expenseList.slice(0,insertIndex), newExpensePeriod, ...expenseList.slice(insertIndex)];
                    newRevenueList = [...revenueList.slice(0,insertIndex), newRevenuePeriod, ...revenueList.slice(insertIndex)];
                }
                localStorage.setItem("Expenses", JSON.stringify(newExpenseList));
                localStorage.setItem("Revenue", JSON.stringify(newRevenueList));
                setExpense(newExpenseList);
                setRevenue(newRevenueList);
            }
            else{
                alert("Cannot select future month");
            }
        }
    }
    return (
        <div className="container">
            <header className="TitleHead"> 
            <h1 className="titleText">{title}</h1>
            <div className={burgerClass} onClick={()=>{burgerClick()}}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div> 
            </header>
            <div className={shadeClass} onClick={()=>{burgerClick()}}></div>
            <SidePanel panelClass={panelClass} setPanelClass={setPanelClass} linkClick={burgerClick}/>
            
            <Outlet context={{"setTitle":setTitle, "addPeriod":addPeriod}}/>
        </div>
    );
}
export default TitleBar;