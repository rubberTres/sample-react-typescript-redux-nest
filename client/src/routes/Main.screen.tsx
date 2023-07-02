import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Streamer } from "types/streamer.types";
import Table from "components/Table";
import React, { useEffect, useState } from "react";
import Loader from "components/Loader";
import { fetchStreamers } from "store/features/streamersReducer";
import AddStreamerModal from "components/AddStreamer.modal";
import { useNavigate } from "react-router-dom";
import Button, { ButtonColor } from "components/Button";

function MainScreen() {

	const dispatch = useAppDispatch();

	const { streamers } = useAppSelector(state => state);

	const [ isAddStreamerModalOpen, toggleAddStreamerModalOpen ] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchStreamers());
	}, []);

	const getData = (): Streamer[] => {
		if (streamers.loading || streamers.error) return [];
		return streamers.data || [];
	}

	const columns: MUIDataTableColumnDef[] = [
		{
			name: "Name",
			options: {
				filter: false,
				sort: true,
				sortCompare: order => (a: { data: Streamer }, b: { data: Streamer }) => {
					if (order === "asc") {
						return a.data.name.localeCompare(b.data.name);
					} else {
						return b.data.name.localeCompare(a.data.name);
					}
				},
				customBodyRender: ({ name }: Streamer) => <div>{ name }</div>
			},
		},
		{
			name: "Platform",
			options: {
				filter: false,
				sort: true,
				sortCompare: order => (a: { data: Streamer }, b: { data: Streamer }) => {
					if (order === "asc") {
						return a.data.platform.localeCompare(b.data.platform);
					} else {
						return b.data.platform.localeCompare(b.data.platform);
					}
				},
				customBodyRender: ({ platform }: Streamer) => <div>{ platform }</div>
			},
		},
		{
			name: "Up votes",
			options: {
				filter: false,
				sort: true,
				sortCompare: order => (a: { data: Streamer }, b: { data: Streamer }) => {
					if (order === "asc") {
						return a.data.upVotes - b.data.upVotes;
					} else {
						return b.data.upVotes - a.data.upVotes;
					}
				},
				customBodyRender: ({ upVotes }: Streamer) => <div>{ upVotes }</div>
			},
		},
		{
			name: "Down votes",
			options: {
				filter: false,
				sort: true,
				sortCompare: order => (a: { data: Streamer }, b: { data: Streamer }) => {
					if (order === "asc") {
						return a.data.downVotes - b.data.downVotes;
					} else {
						return b.data.downVotes - a.data.downVotes;
					}
				},
				customBodyRender: ({ downVotes }: Streamer) => <div>{ downVotes }</div>
			},
		},
	];

	const tableOptions: MUIDataTableOptions = {
		search: false,
		filter: false,
		viewColumns: false,
		onRowClick: (rowData: string[], rowMeta: {dataIndex: number, rowIndex: number}) => {
			if (!streamers.data) return;
			navigate(`/streamer/${ streamers.data[ rowMeta.rowIndex ]._id }`)
		},
		textLabels: {
			body: {
				noMatch: streamers.error ? "Error fetching streamers" : <Loader/>,
			},
		},
		customToolbar: () => (
			<Button
				color={ ButtonColor.SUCCESS }
				onClick={ () => toggleAddStreamerModalOpen(true) }
			>
				Add Streamer
			</Button>
		)
	};


	return (
		<>
			<AddStreamerModal
				isOpen={ isAddStreamerModalOpen }
				toggleModalOpen={ () => toggleAddStreamerModalOpen(isOpen => !isOpen) }
			/>
			<Table
				title="Streamers"
				data={ [ ...getData() ] }
				columns={ columns }
				wrapperHeight={ 900 }
				options={ tableOptions }
			/>
		</>
	);
}

export default MainScreen;