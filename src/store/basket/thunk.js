import { createAsyncThunk } from '@reduxjs/toolkit'
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import { axiosInstace } from '../../lib/axiosInstace'
import { getBasket } from './getBasket'

export const addtoBasket = createAsyncThunk(
    'basket/addToBasket',
    async (newItem, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstace.post(`foods/${newItem.id}/addToBasket`, newItem)
            return dispatch(getBasket())
        } catch (error) {
            return rejectWithValue('Some thing wen wronf')
        }
    }
)

export const updeteBasketItem = createAsyncThunk(
    'basket/updeteBasket',
    async ({ amount, id }, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstace.put(`basketItem/${id}/update`, { amount })
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deleteBasketItem = createAsyncThunk(
    '/basket/deleteBasket',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await axiosInstace.delete(`/basketItem/${id}/delete`)
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const submitOrder = createAsyncThunk(
    'basket/submitOrder',
    async ({ orderData }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(
                `https://jsonplaceholder.typicode.com/posts`,
                orderData
            )

            return dispatch(getBasket())
        } catch (error) {
            return rejectWithValue('Some thing wen wronf')
        }
    }
)
