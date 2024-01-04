import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    favoriteCoins : string[]
}

const initialState:InitialState = {
    favoriteCoins:[]
}

const coinSlice = createSlice({
    name:"coins",
    initialState:initialState,
    reducers:{
        addFavorite:(state,action:PayloadAction<string>)=>{
            const isExistedCoinIndex = state.favoriteCoins.findIndex(coin=>coin === action.payload)
            
            if(isExistedCoinIndex === -1){
               state.favoriteCoins.push(action.payload)
            }else{
                state.favoriteCoins =  state.favoriteCoins.filter(coin=>coin !== action.payload)
            }
        }
    }
})

export const {addFavorite} = coinSlice.actions;
export default coinSlice.reducer;