import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchApi } from '../../lib/fetchAPI'

export const getMeals = createAsyncThunk(
    'meals/getMeals',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await fetchApi('foods')
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
