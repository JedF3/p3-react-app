import { useContext } from "react";
import MonthContext from "../context/MonthContext";
import YearContext from "../context/YearContext";
import months from "./months";
import getCurrentMonthYear, { currentMonth, currentYear } from './getCurrentMonthYear';
function DateYearDropdown(){
    function getYears(){
        let years=[];
        for(let i = 2000; i<=currentYear;i++){
            years.push(i);
        }
        return years;
    }
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    function monthSelect(value){
        setSelectedMonth(value);
    }
    function yearSelect(value){
        setSelectedYear(value);
    }
    return(
        <div className="ExpenseSummary">
        <select value={selectedMonth} onChange={(event)=>monthSelect(event.target.value)} className="dateDropdown">
            {months.map((item, i)=><option key={i}>{item}</option>)}
        </select>
        <select value={selectedYear}onChange={(event)=>yearSelect(event.target.value)} className="dateDropdown">
            {getYears().map((item, i)=><option key={i}>{item}</option>)}
        </select>
    </div>
    );
}
export default DateYearDropdown;