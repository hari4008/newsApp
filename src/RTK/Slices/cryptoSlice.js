import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cryptoServices from '../Services/cryptoServices';

export const getAllCryptoData = createAsyncThunk(
    'crypto/getAllCryptoData',
    async ({range,name}) => {
        try {
            console.log("RANGE  RNAGE",range,name)
            const res = await cryptoServices.getAllCryptoData({range,name});
            console.log("check in crypto", res)
            return res;
        } catch (error) {
            console.log("error in get crypto ", error);
        }
    }
)

export const getCryptoList = createAsyncThunk(
    'crypto/getCryptoList',
    async () => {
        try {
            const res = await cryptoServices.getCryptoList();
            console.log("check in crypto", res)
            return res.data;
        } catch (error) {
            console.log("error in get crypto ", error);
        }
    }
)

export const getCryptoCandle = createAsyncThunk(
    'crypto/getCryptoCandle',
    async (name) => {
        try {
            console.log('NAME',name)
            const res = await cryptoServices.getCryptoCandle(name);
            console.log("check in crypto", res)
            return res;
        } catch (error) {
            console.log("error in get crypto ", error);
        }
    }
)


const cryptoSlice = createSlice({
    name: "cryptoData",
    initialState: {
        cryptoData: [],
        cryptoList:[],
        loading: "",
        error: "",
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCryptoData.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCryptoData.fulfilled, (state, action) => {
                state.loading = false
                console.log("action all CryptoData ", action.payload)
                state.cryptoData = action.payload
            })
            .addCase(getAllCryptoData.rejected, (state) => {
                state.loading = false
                state.error = "error in the get All cryptoList "
            })

        builder
            .addCase(getCryptoList.pending, (state) => {
                state.loading = true
            })
            .addCase(getCryptoList.fulfilled, (state, action) => {
                state.loading = false
                console.log("action all CryptoList ", action.payload)
                state.cryptoList = action.payload
            })
            .addCase(getCryptoList.rejected, (state) => {
                state.loading = false
                state.error = "error in the get All CryptoData "
            })
    }
})

export default cryptoSlice.reducer