import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newsServices from '../Services/newsServices';

export const getAllNews = createAsyncThunk(
    'student/getAllNews',
    async (category) => {
        try {
            const res = await newsServices.getAllNews(category);
            console.log("check",res)
            return res;
        } catch (error) {
            console.log("error in get student ", error);
        }
    }
)

const newsSlice = createSlice({
    name: "news",
    initialState: {
        news: [],
        loading: "",
        error: "",
        totalPages:''
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNews.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllNews.fulfilled, (state, action) => {
                state.loading = false
                console.log("action all news ",action.payload)
                state.news = action.payload
                state.totalPages = action.payload.totalPage                
            })
            .addCase(getAllNews.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all news"
            })
    },
})

export default newsSlice.reducer