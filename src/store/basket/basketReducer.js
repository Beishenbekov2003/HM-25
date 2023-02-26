import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../../lib/fetchAPI";

export const basketActionsTypes = {
  ADD_ITEM_SUCCESS: "ADD_ITEM_SUCCESS",
  GET_BASKET_SUCCESS: "GET_BASKET_SUCCESS",
};

const initialState = {
  items: [],
  error: "",
  isLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    getBasketSucccess(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addtoBasket.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addtoBasket.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addtoBasket.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getBasket.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updeteBasketItem.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updeteBasketItem.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updeteBasketItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteBasketItem.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBasketItem.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBasketItem.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const basketActions = basketSlice.actions;

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await fetchApi("basket");

      return data.items;
    } catch (error) {
      rejectWithValue("Some thing wen wronf");
    }
  }
);

export const addtoBasket = createAsyncThunk(
  "basket/addToBasket",
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`foods/${newItem.id}/addToBasket`, {
        method: "POST",
        body: { amount: newItem.amount },
      });

      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Some thing wen wronf");
    }
  }
);

export const updeteBasketItem = createAsyncThunk(
  "basket/updeteBasket",
  async ({ amount, id }, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`basketItem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });
      dispatch(getBasket());
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteBasketItem = createAsyncThunk(
  "basket/deleteBasket",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`basketItem/${id}/delete`, {
        method: "DELETE",
      });
      dispatch(getBasket());
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const submitOrder = createAsyncThunk(
  "basket/submitOrder",
  async ({ orderData }, { dispatch, rejectWithValue }) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        body: orderData,
      });

      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Some thing wen wronf");
    }
  }
);
