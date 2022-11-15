import { TYPES } from '../actions/types'

const initialState = {}

const loadingReducer = (state = initialState, action) => {
    switch (action.type){
        case TYPES.LOADING:
            return action.payload;
        default:
            return state;
    }
}


export default loadingReducer
