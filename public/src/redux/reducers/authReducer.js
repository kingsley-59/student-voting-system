import { TYPES } from '../actions/types'

const initialState = {
    token:'', 
    user:{ },
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case TYPES.AUTH:
            return { 
                ...state, 
                ...action.payload
            };
        default:
            return state;
    }
}


export default authReducer