import { NavLink, useOutlet, useOutletContext } from "react-router-dom";
import { currentMonth, currentYear } from "./getCurrentMonthYear";
import { useContext } from "react";
import MonthContext from "../context/MonthContext";
import YearContext from "../context/YearContext";
function SidePanel({panelClass, setPanelClass, linkClick}){
    let {selectedMonth, setSelectedMonth} = useContext(MonthContext);
    let {selectedYear, setSelectedYear} = useContext(YearContext);
    return(
        <>
        <div className={panelClass}>
            <div className="sidePanelButtons">
            <NavLink to="/" onClick={()=>{
                setSelectedMonth(currentMonth);
                setSelectedYear(currentYear);
                linkClick();}}>Home</NavLink>
            <NavLink to={"/expenses/"+currentMonth+"/"+currentYear} onClick={()=>{
                setSelectedMonth(currentMonth);
                setSelectedYear(currentYear);
                linkClick();
                }}>Monthly Expenses</NavLink>
            <NavLink to={"/revenue/"+currentMonth+"/"+currentYear} onClick={()=>{
                setSelectedMonth(currentMonth);
                setSelectedYear(currentYear);
                linkClick();
                }}>Monthly Revenue</NavLink>
            </div>
        </div>
        </>
    );
}
export default SidePanel;