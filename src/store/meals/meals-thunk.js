import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstace } from '../../lib/fetchAPI'

export const getMeals = createAsyncThunk(
    'meals/getMeals',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstace.get('/foods')
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
