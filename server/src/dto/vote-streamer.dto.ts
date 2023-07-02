import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Platform } from "src/schema/streamer.schema";

export class VoteStreamerDto {
	@IsNotEmpty()
	@IsNumber()
	readonly vote: string
}