import { Platform } from "types/streamer.types";

export type Nullable<T> = null | undefined | T;

export interface DataState<T> {
	loading: boolean
	data: T
	error: boolean
}

export type FormField<T> = {
	value: T
	error: Nullable<string>
}

export type AddStreamerForm = {
	name: FormField<string>
	platform: FormField<Nullable<Platform>>
	description: FormField<string>
}
