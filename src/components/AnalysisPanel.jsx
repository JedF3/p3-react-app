import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ExpenseContext from "../context/ExpenseContext";
import { faker } from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import months from "./months";
import RevenueContext from "../context/RevenueContext";
import numMonthReducer from "../reducer/numMonthReducer";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );




function AnalysisPanel(){
    let {expenseList} = useContext(ExpenseContext);
    let {revenueList} = useContext(RevenueContext);
    let {setTitle}=useOutletContext();
    let firstRender = useRef(true);
    let [numMonth, dispatchNumMonth] = useReducer(numMonthReducer, 0);
    let [targetPastMonth, setTargetPastMonth] = useState(0);
    let [lastIndex, setLastIndex] = useState(-1);
    let [lineExpenseData, setLineExpenseData]=useState([]);
    let [lineRevenueData, setLineRevenueData]=useState([]);
    function initLineData(type, lastIndex){
      let result=[];
      switch(type){
        case "Expense":
          if(expenseList.length!=1){
          result = expenseList.slice(lastIndex);
          }
          else{
            result = expenseList;
          }
          return result;
        break;
        case "Revenue":
          
          if(revenueList.length!=1){
          result = revenueList.slice(lastIndex);
          }
          else{
            result = revenueList;
          }
          return result;
        break;
      }
      
    }
    const labels = lineExpenseData.map((element)=>element.period);
    const data = {
        labels,
        datasets: [
          {
            label: 'Expenses',
            data: labels.map((item, i) => lineExpenseData[i].expenses.map((element)=>element.amount).reduce((acc, curr)=>acc+curr, 0)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Revenue',
            data: labels.map((item, i ) => lineRevenueData[i].revenue.map((element)=>element.amount).reduce((acc, curr)=>acc+curr, 0)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
          legend: {
            position: 'top',
            labels:{
              font:{
                size:20
              }
            },
          },
          title: {
            display: true,
            text: 'Expense and Revenue Chart',
            font:{
              size:20
            },
          },
        },
      };
    function onChangePeriod(event){
      let selected=event.target.selectedIndex;
      switch(selected){
        case 0:
          dispatchNumMonth({type:"SIX", payload:6});
          setLineExpenseData(initLineData("Expense", lastIndex));
          setLineRevenueData(initLineData("Revenue", lastIndex));
        break;
        case 1:
          dispatchNumMonth({type:"TWELVE", payload:12});
          setLineExpenseData(initLineData("Expense", lastIndex));
          setLineRevenueData(initLineData("Revenue", lastIndex));
        break;
      }
    }
    useEffect(()=>{
      setTitle("Expense Tracker");
      dispatchNumMonth({type:"SIX", payload:6});
    }, []);
    useEffect(()=>{
      if(!firstRender.current){
        setTargetPastMonth(expenseList.length-numMonth)
      }
      firstRender.current=false;
    },[expenseList, numMonth]);
    useEffect(()=>{
      if(!firstRender.current){
        setLastIndex(targetPastMonth>=0? targetPastMonth:0);
      }
    },[targetPastMonth])
    useEffect(()=>{
      if(!firstRender.current){
        setLineExpenseData(initLineData("Expense", lastIndex));
        setLineRevenueData(initLineData("Revenue", lastIndex));
      }
    }, [lastIndex])
    return (
        <div className="whiteMaterial MaterialShadow roundCorner ExpenseAnalysis">
          <select onChange={(event)=>{onChangePeriod(event)}}>
            <option>6 months</option>
            <option>12 months</option>
          </select>
        <div className="lineGraph">
          <Line options={options} data={data}/>
        </div>  
        </div>
    );
}
export default AnalysisPanel;