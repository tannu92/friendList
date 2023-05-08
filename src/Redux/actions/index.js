export const addFriend = (data) =>{
    return (dispatch)=>{
        dispatch({type:'ADD_FRIEND',payload:data})
    }
}