import { AddStreamerForm, DataState, Nullable } from "types/types";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { Streamer } from "types/streamer.types";

type StreamersDataState = DataState<Nullable<Streamer[]>> & {
	isCreating?: boolean
	createError?: boolean
}

const initialState: StreamersDataState = {
	loading: false,
	data: null,
	error: false,
	isCreating: false,
	createError: false,
}

export const fetchStreamers = createAsyncThunk(
	"fetchStreamers",
	async () => {
		const response = await axios.get<Streamer[]>("http://localhost:8080/streamer");
		return response.data;
	}
);

export const createStreamer = createAsyncThunk(
	"createStreamer",
	async (payload: AddStreamerForm & { upVotes: number, downVotes: number }) => {
		const response = await axios.post<Streamer[]>("http://localhost:8080/streamer", payload);
		return response.data;
	}
)

export const { reducer: streamersReducer } = createSlice({
	name: "streamersReducer",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchStreamers.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchStreamers.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = false;
		})
		builder.addCase(fetchStreamers.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.loading = false;
			state.error = true;
		});
		builder.addCase(createStreamer.pending, (state) => {
			state.isCreating = true;
		})
		builder.addCase(createStreamer.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.createError = true;
			state.isCreating = false;
		})
		builder.addMatcher(isAnyOf (fetchStreamers.fulfilled, createStreamer.fulfilled), (state, action) => {
			state.loading = false;
			state.isCreating = false;
			state.data = action.payload;
			state.error = false;
		})
	},
});

export default streamersReducer;