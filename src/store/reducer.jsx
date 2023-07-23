
import numStatus from './numStatus.jsx';

const defaultState = {
    num: numStatus.state
}

let reducer = (state=defaultState,action)=>{
    let newState = JSON.parse(JSON.stringify(state));   
    switch(action.type){
        case "add":
            numStatus.actions.add(newState, action)
            break;

        default:
            break;
    }

    return newState;
}

export default reducer;