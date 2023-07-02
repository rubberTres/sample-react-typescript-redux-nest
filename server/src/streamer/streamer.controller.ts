import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { StreamerService } from "src/streamer/streamer.service";
import { CreateStreamerDto } from "src/dto/create-streamer.dto";
import { UpdateStreamerDto } from "src/dto/update-streamer.dto";

@Controller('streamer')
export class StreamerController {
	constructor(private readonly streamerService: StreamerService) {}

	@Post()
	async createStreamer(@Res() response, @Body() createStreamerDto: CreateStreamerDto ) {
		try {
			const streamersData = await this.streamerService.getAllStreamers();
			const newStreamer = await this.streamerService.createStreamer(createStreamerDto);
			return response.status(HttpStatus.CREATED).json([ ...streamersData, newStreamer ]);
		} catch (err) {
			return response.status(HttpStatus.BAD_REQUEST).json({
				statusCode: 400,
				message: "Error, Streamer not created",
				error: "Bad request",
			})
		}
	}

	@Get()
	async getStreamers(@Res() response) {
		try {
			const streamersData = await this.streamerService.getAllStreamers();
			return response.status(HttpStatus.OK).json(streamersData)
		} catch (err) {
			return response.status(err.status).json(err.response());
		}
	}

	@Get("/:id")
	async getStreamerById(@Res() response, @Param("id") streamerId: string) {
		try {
			const streamer = await this.streamerService.getStreamer(streamerId);
			return response.status(HttpStatus.OK).json(streamer)
		} catch (err) {
			return response.status(err.status).json(err.response());
		}
	}

	@Put("/:id")
	async updateStreamer(@Res() response, @Param("id") streamerId: string, @Body() updateStreamerDto: UpdateStreamerDto) {
		try {
			const streamer = await this.streamerService.updateStreamer(streamerId,  updateStreamerDto);
			return response.status(HttpStatus.OK).json(streamer)
		} catch (err) {
			return response.status(err.status).json(err.response());
		}
	}

	@Delete("/:id")
	async deleteStreamer(@Res() response, @Param("id") streamerId: string) {
		try {
			const streamer = await this.streamerService.deleteStreamer(streamerId);
			return response.status(HttpStatus.OK).json(streamer)
		} catch(err) {
			return response.status(err.status).json(err.response());
		}
	}
}
