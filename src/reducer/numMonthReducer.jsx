function numMonthReducer(state, action){
    console.log("fire");
    switch(action.type){
        case "SIX":
            return 6;
        case "TWELVE":
            return 12;
    }

}
export default numMonthReducer;