import { DataState, Nullable } from "types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Streamer, Vote } from "types/streamer.types";

type voteStreamerPayload = {
	streamerId: string
	vote: Vote
}

type SingleStreamerDataState = DataState<Nullable<Streamer>> & {
	isVoting: boolean
	voteError: boolean
}

const initialState: SingleStreamerDataState = {
	loading: false,
	data: null,
	error: false,
	isVoting: false,
	voteError: false,
}

export const fetchSingleStreamer = createAsyncThunk(
	"fetchSingleStreamer",
	async (streamerId: string) => {
		const response = await axios.get<Streamer>(`http://localhost:8080/streamer/${ streamerId }`);
		return response.data;
	}
);

export const voteSingleStreamer = createAsyncThunk(
	"voteSingleStreamer",
	async ({ streamerId, vote }: voteStreamerPayload) => {
		const response = await axios.put<Streamer>(`http://localhost:8080/streamer/${ streamerId }/vote`, { vote });
		return response.data;
	}
)

export const { reducer: singleStreamerReducer } = createSlice({
	name: "streamersReducer",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//fetchSingleStreamer
		builder.addCase(fetchSingleStreamer.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(fetchSingleStreamer.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = false;
		})
		builder.addCase(fetchSingleStreamer.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.loading = false;
			state.error = true;
		});

		//UpVote
		builder.addCase(voteSingleStreamer.pending, (state) => {
			console.log(state);
			state.isVoting = true;
		})
		builder.addCase(voteSingleStreamer.fulfilled, (state, action) => {
			state.isVoting = false;
			state.data = action.payload;
			state.voteError = false;
		})
		builder.addCase(voteSingleStreamer.rejected, (state, action) => {
			console.error("Error", action.payload);
			state.isVoting = false;
			state.voteError = true;
		});
	},
});

export default singleStreamerReducer;