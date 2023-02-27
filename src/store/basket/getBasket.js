import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchApi } from '../../lib/fetchAPI'

export const getBasket = createAsyncThunk('basket/getBasket', async () => {
    const { data } = await fetchApi('basket')
    return data.items
})
