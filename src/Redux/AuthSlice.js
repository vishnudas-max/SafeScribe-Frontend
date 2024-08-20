import {createSlice} from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name:'auth',
    initialState:{
        is_authenticated:false,
        is_admin:false,
        username:'',
        userID:''
    },
    reducers:{
        setAuth:(state,action)=>{
            state.is_authenticated = true
            state.is_admin = action.payload.is_admin
            state.username = action.payload.username
            state.userID = action.payload.userID

        },
        deleteAuth:(state,action)=>{
            state.is_authenticated = false
            state.is_admin = false
            state.username = ''
            state.userID = ''
        }
    }
})

export const {setAuth,deleteAuth} = AuthSlice.actions
export default AuthSlice.reducer