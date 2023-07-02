import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Platform {
	TWITCH = "Twitch",
	YOUTUBE = "YouTube",
	TIKTOK = "TikTok",
	KICK = "Kick",
	RUBLE = "Ruble",
}

@Schema()
export class Streamer {
	@Prop()
	name: string;
	@Prop()
	platform: Platform;
	@Prop()
	description: string;
	@Prop()
	upVotes: number;
	@Prop()
	downVotes: number;
}

export const StreamerSchema = SchemaFactory.createForClass(Streamer);