const friendReducer = (state=[{ id: 1, name: 'Tannu' }],action) =>{
    switch(action.type) {
        case 'ADD_FRIEND':
           state.push({id:state[state.length-1].id+1,name:action.payload})
           return state
        case 'LOCAL_STORAGE':
            return action.payload    
        default:
          return state;
      }
}

export default friendReducer