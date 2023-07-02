import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Platform } from "src/schema/streamer.schema";

export class CreateStreamerDto {
	@IsString()
	@IsNotEmpty()
	readonly name: string;

	@IsNotEmpty()
	readonly platform: Platform;

	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@IsNumber()
	@IsNotEmpty()
	readonly upVotes: number;

	@IsNumber()
	@IsNotEmpty()
	readonly downVotes: number;
}