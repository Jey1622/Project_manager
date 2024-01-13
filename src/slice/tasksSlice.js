import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    taskList:[],
    selectedTask:{},
    isLoading:false,
    error:''
}

const BASE_URL='http://localhost:8000/tasks'

//GET
export const getTasksFromServer=createAsyncThunk(
    "tasks/getTasksFromServer",
    async (_,{rejectWithValue})=>{
        const response =await fetch(BASE_URL)
        if(response.ok){
            const jsonResponse=await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'No Tasks Found'})
        }
    }
)

//POST
export const addTaskToServer=createAsyncThunk(
    "tasks/addTaskToServer",
    async (task,{rejectWithValue})=>{
        const options={
            method:'POST',
            body:JSON.stringify(task),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        }

        const response =await fetch(BASE_URL,options)
        if(response.ok){
            const jsonResponse=await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Added'})
        }
    }
)

//PATCH
export const updateInServer=createAsyncThunk(
    "tasks/updateInServer",
    async (task,{rejectWithValue})=>{
        const options={
            method:'PATCH',
            body:JSON.stringify(task),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        }

        const response =await fetch(BASE_URL + '/'+task.id,options)
        if(response.ok){
            const jsonResponse=await response.json()
            return jsonResponse
        }else{
            return rejectWithValue({error:'Task Not Updated'})
        }
    }
)

const tasksSlice=createSlice({
    name:'taskSlice',
    initialState,
    reducers:{
        addTaskToList:(state,action)=>{
            const id=Math.random()*100
            let task={...action.payload,id}
            state.taskList.push(task)
        },
        removeTaskFromList:(state,action)=>{
            state.taskList=state.taskList.filter((task)=>task.id !== action.payload.id)
        },
        updateTaskInList:(state,action)=>{
            state.taskList=state.taskList.map((task)=>task.id===action.payload.id ? action.payload : task)
        },
        setSelectedTask:(state,action)=>{
            state.selectedTask=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getTasksFromServer.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getTasksFromServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                state.taskList=action.payload
            })
            .addCase(getTasksFromServer.rejected,(state,action)=>{
                state.error=action.payload.error
                state.isLoading=false
                state.taskList=[]
            })
            .addCase(addTaskToServer.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(addTaskToServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                state.taskList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected,(state,action)=>{
                state.error=action.payload.error
                state.isLoading=false
            })
            .addCase(updateInServer.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(updateInServer.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error=''
                 state.taskList=state.taskList.map((task)=>task.id===action.payload.id ? action.payload : task)
            })
            .addCase(updateInServer.rejected,(state,action)=>{
                state.error=action.payload.error
                state.isLoading=false
            })
    }
})

export const { addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask}=tasksSlice.actions

export default tasksSlice.reducer