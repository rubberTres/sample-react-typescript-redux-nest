import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schema/student.schema";
import { StudentService } from "./student/student.service";
import { StudentController } from "./student/student.controller";
import { StreamerSchema } from "src/schema/streamer.schema";
import { StreamerService } from './streamer/streamer.service';
import { StreamerController } from './streamer/streamer.controller';

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost:27017", { dbName: "streamerSpotlightApp" }),
		MongooseModule.forFeature([ { name: "Student", schema: StudentSchema } ]),
		MongooseModule.forFeature([ { name: "Streamer", schema: StreamerSchema } ]),
	],
	controllers: [ AppController, StudentController, StreamerController ],
	providers: [ AppService, StudentService, StreamerService ],
})
export class AppModule {
}
