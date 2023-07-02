import { Document } from "mongoose";
import { Platform } from "src/schema/streamer.schema";

export interface IStudent extends Document {
	readonly name: string;
	readonly roleNumber: number;
	readonly class: number;
	readonly gender: string;
	readonly marks: number;
}

export interface IStreamer extends Document {
	readonly name: string;
	readonly platform: Platform;
	readonly description: string;
	readonly upVotes: number
	readonly downVotes: number;
}