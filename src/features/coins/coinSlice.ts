import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoinType } from "../../types";

type InitialState = {
    favoriteCoins : CoinType[];
    loading:boolean;
    error:boolean;
}

const initialState:InitialState = {
    favoriteCoins:[],
    loading:false,
    error:false,
}

const coinSlice = createSlice({
    name:"coins",
    initialState:initialState,
    reducers:{
        addFavorite:(state,action:PayloadAction<CoinType>)=>{
            const isExistedCoinIndex = state.favoriteCoins.findIndex(coin=>coin.uuid === action.payload.uuid)
            
            if(isExistedCoinIndex === -1){
               state.favoriteCoins.push(action.payload)
            }else{
                state.favoriteCoins =  state.favoriteCoins.filter(coin=>coin.uuid !== action.payload.uuid)
            }
        }
    },
})

export const {addFavorite} = coinSlice.actions;
export default coinSlice.reducer;