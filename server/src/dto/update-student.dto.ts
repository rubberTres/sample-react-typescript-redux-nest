import { PartialType } from "@nestjs/mapped-types";
import { CreateStudentDto } from "src/dto/create-student.dto";

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
}