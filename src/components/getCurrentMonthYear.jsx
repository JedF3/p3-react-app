import months from "./months";
function getCurrentMonthYear(targetMonth=new Date().getMonth(), targetYear=new Date().getFullYear()){
    return {"month":months[targetMonth], "year":targetYear};
}
export let currentMonth = getCurrentMonthYear().month;
export let currentYear = getCurrentMonthYear().year;

export default getCurrentMonthYear;