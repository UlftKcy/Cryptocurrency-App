import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoinType } from "../../types";
import { fetchSearchSuggestionCoins } from "../../utils/service/api";

type InitialState = {
    favoriteCoins : CoinType[];
    searchSuggestionCoins:CoinType[];
    loading:boolean;
    error:boolean;
}

const initialState:InitialState = {
    favoriteCoins:[],
    searchSuggestionCoins:[],
    loading:false,
    error:false,
}

export const getSearchSuggestionCoins = createAsyncThunk("search-suggestions/get",async(query:string)=>{
    const data = await fetchSearchSuggestionCoins(query);
    return data;
})

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
    extraReducers:(builder)=>{
        builder.addCase(getSearchSuggestionCoins.pending,(state,action)=>{
            state.loading = true;
            state.error = false;
        })
        builder.addCase(getSearchSuggestionCoins.fulfilled,(state,action)=>{
            state.searchSuggestionCoins = action.payload;
            state.loading = false;
            state.error = false;
        })
        builder.addCase(getSearchSuggestionCoins.rejected,(state,action)=>{
            state.loading = false;
            state.error = true;
        })
    }
})

export const {addFavorite} = coinSlice.actions;
export default coinSlice.reducer;