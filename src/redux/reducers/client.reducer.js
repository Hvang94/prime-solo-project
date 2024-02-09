const clientReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ClIENT':
            return action.payload;
            default: return state;
    }
}


export default clientReducer;