import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  dataWho: null,
  dataClients: null,
dataType:null,
  isError: false,
};

const baseURL = `https://backend.pointksa.net/api/`;

export const whoApi = createAsyncThunk("get/who", async (lang) => {
  try {
    const response = await axios.get(`${baseURL}about?lang=${lang}`);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
});
export const clientsApi = createAsyncThunk("get/clients", async () => {
  try {
    const response = await axios.get(`${baseURL}getPartners`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
});
export const typeApi = createAsyncThunk("get/all", async (dataType) => {
  try {
    const response = await axios.get(
      `${baseURL}getContent?lang=${dataType?.lang}&key=${dataType?.key}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
});

export const ApiGet = createSlice({
  name: "gets",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(whoApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(whoApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataContact = action.payload;
          })
          .addCase(whoApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(clientsApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(clientsApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataClients = action.payload;
          })
          .addCase(clientsApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
          .addCase(typeApi.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error state
          })
          .addCase(typeApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataType = action.payload;
          })
          .addCase(typeApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          });
    }
});

export default ApiGet.reducer;
