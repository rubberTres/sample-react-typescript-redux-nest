import { configureStore } from "@reduxjs/toolkit";
import streamersReducer from "store/features/streamersReducer";
import singleStreamerReducer from "store/features/singleStreamerReducer";

export const store = configureStore({
	reducer: {
		streamers: streamersReducer,
		singleStreamer: singleStreamerReducer,
	}
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>