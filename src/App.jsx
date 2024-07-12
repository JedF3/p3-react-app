import { Routes, Route } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import AnalysisPanel from "./components/AnalysisPanel";
import SummaryPanel from "./components/SummaryPanel";
import CurrentMonthExpense from "./components/CurrentMonthExpense";
import CurrentMonthRevenue from "./components/CurrentMonthRevenue";
import { useState } from "react";
import ExpenseContext from "./context/ExpenseContext";
import RevenueContext from "./context/RevenueContext";
import { currentMonth, currentYear } from "./components/getCurrentMonthYear";
import MonthContext from "./context/MonthContext";
import YearContext from "./context/YearContext";

function App() {

   let [expenseList, setExpense] = useState([]);
   let [revenueList, setRevenue] = useState([]);
   let expenseValue = {expenseList, setExpense};
   let revenueValue = {revenueList, setRevenue};
   let [selectedMonth, setSelectedMonth] = useState(currentMonth);
   let [selectedYear, setSelectedYear] = useState(currentYear);
   let monthValue = {selectedMonth, setSelectedMonth};
   let yearValue = {selectedYear, setSelectedYear};

  return (
    <ExpenseContext.Provider value={expenseValue}>
      <RevenueContext.Provider value={revenueValue}>
        <MonthContext.Provider value={monthValue}>
          <YearContext.Provider value={yearValue}>
            <Routes>
              <Route path="/" element={<TitleBar/>}>
                <Route index element={<div className="contents"><AnalysisPanel/> <SummaryPanel/></div>}></Route>
                <Route path="/expenses/:month/:year" element={<div className="contents"><CurrentMonthExpense/></div>}/>
                <Route path="/revenue/:month/:year" element={<div className="contents"><CurrentMonthRevenue/></div>}/>
              </Route>
            </Routes>
          </YearContext.Provider>
        </MonthContext.Provider>
      </RevenueContext.Provider>
    </ExpenseContext.Provider>
  );
}

export default App;
