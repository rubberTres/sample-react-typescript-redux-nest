import React from "react";
import ReactDOM from "react-dom/client";
import "App.scss";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import MainScreen from "routes/Main.screen";
import { Provider } from "react-redux";
import { store } from "store/store";
import SingleStreamerScreen from "routes/SingleStreamer.screen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainScreen/>
	},
	{
		path: "/streamer/:streamerId",
		element: <SingleStreamerScreen/>
	},
])

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<Provider store={ store }>
		<RouterProvider router={router} />
	</Provider>
);
