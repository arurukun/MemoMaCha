export const createTodoR=(state={},action)=>{
    switch(action.type){
        case "CREATE_TODO_REQ":
            return {loading:true}
        case "CREATE_TODO_SUC":
            return {loading:false,data:action.payload}
        case "CREATE_TODO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}

export const listTodoR=(state=[],action)=>{
    switch(action.type){
        case "LIST_TODO_REQ":
            return {loading:true}
        case "LIST_TODO_SUC":
            return {loading:false,data:action.payload}
        case "LIST_TODO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}

export const getTodoR=(state={},action)=>{
    switch(action.type){
        case "GET_TODO_REQ":
            return {loading:true}
        case "GET_TODO_SUC":
            return {loading:false,todo:action.payload}
        case "GET_TODO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}

export const editTodoR=(state={},action)=>{
    switch(action.type){
        case "EDIT_TODO_REQ":
            return {loading:true}
        case "EDIT_TODO_SUC":
            return {loading:false,todo:action.payload}
        case "EDIT_TODO_FAIL":
            return {loading:false,error:action.papyload}
        default:
            return state
    }
}