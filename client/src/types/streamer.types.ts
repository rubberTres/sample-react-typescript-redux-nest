export enum Platform {
	TWITCH = "Twitch",
	YOUTUBE = "YouTube",
	TIKTOK = "TikTok",
	KICK = "Kick",
	RUBLE = "Ruble",
}

export type Streamer = {
	_id: string
	name: string
	platform: Platform
	description: string
	upVotes: number
	downVotes: number
}

export enum Vote {
	UP = "UP",
	DOWN = "DOWN",
}