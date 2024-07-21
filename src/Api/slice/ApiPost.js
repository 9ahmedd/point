import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  dataContact: null,
  formData: null,
  isError: false,
};

const baseURL = `http://backend.pointksa.net/api/`;

export const contactApi = createAsyncThunk("post/contact", async (dataContact) => {
  try {
      const response = await axios.post(`${baseURL}ContactUs`, dataContact,
          {  headers: {
        'Content-Type': 'application/json'
      },}
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
});
export const joinApi = createAsyncThunk("post/join", async (formData) => {
  try {
    const response = await axios.post(`${baseURL}JoinUs`, formData, {
      headers: {
        "Content-Type":'multipart/form-data'
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
});



export const ApiPost = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error state
      })
      .addCase(contactApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataContact = action.payload;
      })
      .addCase(contactApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(joinApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset error state
      })
      .addCase(joinApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.formData = action.payload;
      })
      .addCase(joinApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
   
  },
});

export default ApiPost.reducer;
