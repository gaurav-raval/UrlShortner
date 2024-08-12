import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated :false
}

export const linkSlice = createSlice({
    name :'link',
    initialState,
    reducers :{
        setIsAuthenticated : (state,action) =>{
            state.isAuthenticated = action.payload  
    }}
})

export const {setIsAuthenticated} = linkSlice.actions   

export default linkSlice.reducer