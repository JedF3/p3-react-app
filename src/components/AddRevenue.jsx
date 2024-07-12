import { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import months from "./months";
import "react-datepicker/dist/react-datepicker.css";
import MonthContext from "../context/MonthContext";
import YearContext from "../context/YearContext";
import ExpenseCategories from "./ExpenseCategories";
import { v4 as uuidv4 } from 'uuid';
import ExpenseContext from "../context/ExpenseContext";
import RevenueContext from "../context/RevenueContext";
import RevenueCategories from "./RevenueCategories";


function AddRevenue({addRevenueClass, handleAddRevenueChange, updateMode, 
    updRevenueID, updRevenueName, updRevenueDate, updRevenueCategory, updRevenueAmount, updRevenueRemark,
    setUpID, setUpName, setUpDate, setUpCategory, setUpAmount, setUpRemarks
    }){
    let {setRevenue} = useContext(RevenueContext);
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    let [revenueDate, setRevenueDate] = useState(null);
    let [revenueName, setRevenueName] = useState("");
    let [revenueCategory, setRevenueCategory] = useState("Salary");
    let [revenueAmount, setRevenueAmount] = useState("");
    let [revenueRemark, setRevenueRemark] = useState("")
    let submitter;
    function dateSelected(date){
        let stringDate = date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear();
        setRevenueDate(stringDate);
    }
    function amountKey(event){
        if((isNaN(event.key)||event.keyCode==32)&&!((event.key==="Backspace")||(event.key==="Delete")||(event.keyCode==37||event.keyCode==39)||(event.keyCode==190))){
            event.preventDefault();
        }
        if(revenueAmount.includes(".")&&event.keyCode==190){
            event.preventDefault();
        }
    }
    function submitNewRevenue(){
        let tempRevenue = JSON.parse(localStorage.getItem("Revenue"));
        let targetIndex = tempRevenue.findIndex((element)=>element.period==selectedMonth+"-"+selectedYear)
        switch(submitter){
            case 1:
                let newRevenue = {"id":uuidv4(), "revenueName":revenueName, "date":revenueDate, "category":revenueCategory, "amount":Number(revenueAmount), "remarks":revenueRemark};
                tempRevenue[targetIndex].revenue.push(newRevenue);
                localStorage.setItem("Revenue", JSON.stringify(tempRevenue));
                handleAddRevenueChange();
                setRevenueName("");
                setRevenueDate(null);
                setRevenueCategory("Salary");
                setRevenueAmount("");
                setRevenueRemark("");
                setRevenue(tempRevenue);
            break;
            case 2:
                let replaceRevenue = {"id":updRevenueID, "revenueName":revenueName, "date":revenueDate, "category":revenueCategory, "amount":Number(revenueAmount), "remarks":revenueRemark};
                let replaceIndex = tempRevenue[targetIndex].revenue.findIndex((element)=>element.id==updRevenueID)
                tempRevenue[targetIndex].revenue[replaceIndex]=replaceRevenue;
                localStorage.setItem("Revenue", JSON.stringify(tempRevenue));
                setRevenueName("");
                setRevenueDate(null);
                setRevenueCategory("Salary");
                setRevenueAmount("");
                setRevenueRemark("");
                setRevenue(tempRevenue);
                setUpID("");
                setUpName("");
                setUpDate(new Date());
                setUpCategory("Utilities")
                setUpAmount("");
                setUpRemarks("");
            break;
        }

    }
    useEffect(()=>{
        if(updateMode==true){
            setRevenueName(updRevenueName);
            dateSelected(updRevenueDate);
            setRevenueCategory(updRevenueCategory);
            setRevenueAmount(String(updRevenueAmount));
            setRevenueRemark(updRevenueRemark);
        }
    },[updRevenueID]);
    function updateRevenue(){

    }
    return(
        <div className={addRevenueClass}>
            <h2 className="addEditTitle">{updateMode?"Update Revenue":"Add Revenue"}</h2>
            <form className="addExpenseForm" onSubmit={e=>{e.preventDefault();submitNewRevenue();}}>
            <label>Revenue Name</label>
            <input type="text" placeholder="Bananas or something" value={revenueName} onChange={(event)=>{setRevenueName(event.target.value)}} required className="addInputField"></input>
            <label>Date</label>
            <DatePicker
                selected={revenueDate}
                onChange={(date) => {dateSelected(date)}}
                minDate={new Date(selectedMonth+"-1-"+selectedYear)}
                maxDate={new Date(months[months.findIndex((element)=>element==selectedMonth)+1]+"-0-"+selectedYear)}
                placeholderText="Select a date within the month" 
                required
                className="addInputField"
            />
            <label>Category</label>
            <select onChange={(event)=>{setRevenueCategory(event.target.value)}} required className="addInputField">
                {RevenueCategories.map((element, i)=><option key={i}>{element}</option>)}
            </select>
            <label>Amount</label>
            <input type="text" placeholder="50.00" step="0.01" min="0" value={revenueAmount} onKeyDown={(event)=>{amountKey(event)}} onChange={(event)=>{setRevenueAmount(event.target.value)}} required className="addInputField"></input>
            <label>Remarks</label>
            <input type="text" placeholder="Explain the revenue" value={revenueRemark} onChange={(event)=>{setRevenueRemark(event.target.value)}} required className="addInputField"></input>
            {!updateMode &&
                <button className="addExpenseButton roundCorner MaterialShadow" onClick={()=>submitter=1}>Add new revenue</button>
            }
            {updateMode &&
                <button className="addExpenseButton roundCorner MaterialShadow" onClick={()=>submitter=2}>Update Revenue</button>
            }
            </form>
        </div>
    );
}
export default AddRevenue;