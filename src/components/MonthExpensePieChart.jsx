import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useContext, useEffect, useState, useRef } from 'react';
import ExpenseCategories from './ExpenseCategories';
import ExpenseContext from '../context/ExpenseContext';
import MonthContext from '../context/MonthContext';
import YearContext from '../context/YearContext';
ChartJS.register(ArcElement, Tooltip, Legend);

function MonthExpensePieChart(){
    let [expensesDuringMonth, setExpenseDuringMonth] = useState([]);
    let {expenseList, setExpense} = useContext(ExpenseContext);
    let [pieData, setPieData] = useState([{"category":"nothing", "amount":11}]);
    let firstRender = useRef(true);
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    let tempMonthExpense;
    useEffect(()=>{
      if(!firstRender.current){
        try{
          tempMonthExpense = expenseList.find((element)=>element.period==selectedMonth+"-"+selectedYear).expenses;
          setExpenseDuringMonth(tempMonthExpense);
        }
        catch{
          setExpenseDuringMonth([]);
        }
      }
    },[expenseList, selectedMonth, selectedYear]);
    useEffect(()=>{
      if(!firstRender.current){
        let resultArray=[];
        expensesDuringMonth.forEach((element)=>{
          if(ExpenseCategories.includes(element.category)){
            if(resultArray.find((item)=>item.category==element.category)!=undefined){
              resultArray[resultArray.findIndex((object)=>object.category==element.category)].amount+=element.amount;
            }
            else{
              resultArray.push({"category":element.category, "amount":element.amount});
            }
          }
        });
        setPieData(resultArray);
      }
      firstRender.current=false;
    },[expensesDuringMonth]);
    const data = {
        labels: pieData.map((element)=>element.category),
        datasets: [
          {
            label: 'Amount',
            data: pieData.map((element)=>element.amount),
            backgroundColor: [
              'rgba(18, 150, 227, 0.5)',
              'rgba(179, 0, 255, 0.5)',
              'rgba(255, 196, 0, 0.5)',
              'rgba(6, 194, 65, 0.5)',
              'rgba(2, 245, 241,0.5)',
              'rgba(255, 119, 0, 0.5)',
              'rgba(195, 255, 0, 0.5)',
              'rgba(0, 68, 255, 0.5)',
              'rgba(184, 0, 0,0.5)',
              'rgba(92, 158, 120, 0.5)',
              'rgba(82, 57, 2, 0.5)',

            ],
            borderColor: [
              '#005180',
              '#58017d',
              '#ffae00',
              '#036622',
              '#017573',
              '#ff3c00',
              '#567500',
              '#001757',
              '#700000',
              '#294535',
              '#241900',
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        maintainAspectRatio:false,
        plugins: {
          legend: {
            position: "right",
            labels:{
              font:{
                size:20
              }
            }
          }
        }
      };
    return (
        <Pie data={data} options={options}/>
);
}

export default MonthExpensePieChart;