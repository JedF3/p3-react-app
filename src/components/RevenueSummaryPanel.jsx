import React, { useContext, useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import getCurrentMonthYear, { currentMonth, currentYear } from './getCurrentMonthYear';
import { v4 as uuidv4 } from 'uuid';
import MonthContext from '../context/MonthContext';
import YearContext from '../context/YearContext';
ModuleRegistry.registerModules([ ClientSideRowModelModule ]);
import months from './months';
import RevenueContext from '../context/RevenueContext';
import AddRevenue from './AddRevenue';
function RevenueSummaryPanel(){
    let firstRender = useRef(true);
    let addRender = useRef(false);
    let {revenueList, setRevenue} = useContext(RevenueContext);
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    let {addPeriod} = useOutletContext();
    let sampleRevenue = [{"id":uuidv4(), "revenueName":"Monthly Salary", "date":"05-04-2024", "category":"Salary", "amount":10000.00, "remarks":"Just your usual salary"}
    ];
    let [sampleOn, setSampleOn]=useState(false);
    const [rowData, setRowData] = useState([]);
        
    const [colDefs, setColDefs] = useState([
        { headerName:"ID", field: "id", filter:true, floatingFilter:true, hide:true, suppressToolPanel:true },
        { headerName:"Revenue Name", field: "revenueName", filter:true, floatingFilter:true },
        { headerName:"Category", field: "category", filter:true, floatingFilter:true },
        { headerName:"Date", field: "date", filter:true, floatingFilter:true },
        { headerName:"Amount", field: "amount", filter:true, floatingFilter:true },
        { headerName:"Remarks", field: "remarks", filter:true, floatingFilter:true }
        ]);
        let tempRevenueData = JSON.parse(localStorage.getItem("Revenue"));
        let addRevenueClassShow = "whiteMaterial MaterialShadow roundCorner show updItem";
        let addRevenueClassHide = "whiteMaterial MaterialShadow roundCorner hide updItem";
        let [shadeClass, setShadeClass] = useState("shade hide"); 
        let [addRevenueClass, setAddRevenueClass] = useState("whiteMaterial MaterialShadow roundCorner hide updItem");
        let [updateRevenueID, setUpdateRevenueID] = useState("");
        let [updateRevenueName, setUpdateRevenueName] = useState("");
        let [updateRevenueCategory, setUpdateRevenueCategory] = useState("");
        let [updateRevenueDate, setUpdateRevenueDate] = useState(new Date());
        let [updateRevenueAmount, setUpdateRevenueAmount] = useState("");
        let [updateRevenueRemarks, setUpdateRevenueRemarks] = useState("");
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
    useEffect(()=>{
        if (firstRender.current&&tempRevenueData==null){
            tempRevenueData = [{"period":selectedMonth+"-"+selectedYear, "revenue":sampleRevenue}];
            localStorage.setItem("Revenue", JSON.stringify(tempRevenueData));
            setRevenue(tempRevenueData);
            setSampleOn(true);
        }
        if (firstRender.current&&!(tempRevenueData==null)){
            setRevenue(tempRevenueData);
            setSampleOn(false);
        }
        if(!firstRender.current){
            setRowData(revenueList.find((element)=>element.period==selectedMonth+"-"+selectedYear).revenue);
        }
    }, [revenueList]);
    useEffect(()=>{
        if(!firstRender.current){
            try{
                setRowData(revenueList.find((element)=>element.period==selectedMonth+"-"+selectedYear).revenue);
            }
            catch{
                addPeriod();
            }
        }
        firstRender.current=false;
    },[selectedMonth, selectedYear]);
    function summaryRowClicked(event){
        if(addRevenueClass.includes("hide")){
            let selectedRevenue = event.data;
            setUpdateRevenueID(selectedRevenue.id);
            setUpdateRevenueName(selectedRevenue.revenueName);
            setUpdateRevenueDate(new Date(selectedRevenue.date));
            setUpdateRevenueCategory(selectedRevenue.category);
            setUpdateRevenueAmount(Number(selectedRevenue.amount));
            setUpdateRevenueRemarks(selectedRevenue.remarks);
            addRender.current=true;
        }
        else{
            setUpdateRevenueID("");
            setUpdateRevenueName("");
            setUpdateRevenueDate(new Date());
            setUpdateRevenueCategory("Utilities");
            setUpdateRevenueAmount("");
            setUpdateRevenueRemarks("");
        }
    }
    useEffect(()=>{
        if(addRender.current){
            handleAddRevenueChange();
        }
    },[updateRevenueID]);
    return(
        <div className="whiteMaterial MaterialShadow roundCorner ExpenseSummary preventBottom">
            {sampleOn &&
                <h4>The below is sample data.</h4>
            }
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
            <AddRevenue addRevenueClass={addRevenueClass} 
            handleAddRevenueChange={handleAddRevenueChange}
            updateMode={true}
            updRevenueID={updateRevenueID}
            updRevenueName={updateRevenueName}
            updRevenueDate={updateRevenueDate}
            updRevenueCategory={updateRevenueCategory}
            updRevenueAmount={updateRevenueAmount}
            updRevenueRemark={updateRevenueRemarks}
            setUpID={setUpdateRevenueID}
            setUpName={setUpdateRevenueName}
            setUpDate={setUpdateRevenueDate}
            setUpCategory={setUpdateRevenueCategory}
            setUpAmount={setUpdateRevenueAmount}
            setUpRemarks={setUpdateRevenueRemarks}
            />
            
        </div>
    );
}
export default RevenueSummaryPanel;