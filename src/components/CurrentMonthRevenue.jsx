import months from "./months";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import RevenueSummaryPanel from "./RevenueSummaryPanel";
import DateYearDropdown from "./DateYearDropdown";
import MonthRevenuePieChart from "./MonthRevenuePieChart";
import AddRevenue from "./AddRevenue";
function CurrentMonthRevenue(){
    let {setTitle}=useOutletContext();
    let addRevenueClassShow = "whiteMaterial MaterialShadow roundCorner show addItem";
    let addRevenueClassHide = "whiteMaterial MaterialShadow roundCorner hide addItem";
    let [shadeClass, setShadeClass] = useState("shade hide"); 
    let [addRevenueClass, setAddRevenueClass] = useState("whiteMaterial MaterialShadow roundCorner hide addItem");
    useEffect(()=>{setTitle("Monthly Revenue")},[]);
    function handleAddRevenueChange(){
        if (addRevenueClass.includes("hide")){
            setShadeClass("shade show");
            setAddRevenueClass(addRevenueClassShow);
        }
        else{
            setShadeClass("shade hide");
            setAddRevenueClass(addRevenueClassHide);
        }
    }
    useEffect(()=>{setTitle("Monthly Revenue")},[]);
    return (
        <div className="contents reducedTop">
            <DateYearDropdown/>
            <div className="whiteMaterial MaterialShadow roundCorner ExpenseAnalysis monthlyViewAnalysis">
                <MonthRevenuePieChart/>
            </div>
            <div className="ExpenseSummary">               
                <button className="addExpenseButton whiteMaterial MaterialShadow roundCorner" onClick={()=>{handleAddRevenueChange()}}>Add Revenue</button>
            </div>
            <RevenueSummaryPanel/>
            <div className={shadeClass} onClick={()=>{handleAddRevenueChange()}}></div>
            <AddRevenue addRevenueClass={addRevenueClass} handleAddRevenueChange={handleAddRevenueChange}/>
        </div>
    );
}
export default CurrentMonthRevenue;