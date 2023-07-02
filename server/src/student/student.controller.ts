import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { StudentService } from "src/student/student.service";
import { CreateStudentDto } from "src/dto/create-student.dto";
import { UpdateStudentDto } from "src/dto/update-student.dto";

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@Post()
	async createStudent(@Res() response, @Body() createStudentDto: CreateStudentDto ) {
		try {
			const newStudent = await this.studentService.createStudent(createStudentDto);
			return response.status(HttpStatus.CREATED).json({
				message: "Student has been created successfully",
				newStudent,
			})
		} catch (err) {
			return response.status(HttpStatus.BAD_REQUEST).json({
				statusCode: 400,
				message: "Error, Student not created",
				error: "Bad request",
			})
		}
	}

	@Get()
	async getStudents(@Res() response) {
		try {
			const studentsData = await this.studentService.getAllStudents();
			return response.status(HttpStatus.OK).json({
				message: "All students data found successfully",
				studentsData,
			})
		} catch (err) {
			return response.status(err.status).json(err.response());
		}
	}

	@Get("/:id")
	async getStudentById(@Res() response, @Param("id") studentId: string) {
		try {
			const student = await this.studentService.getStudent(studentId);
			return response.status(HttpStatus.OK).json({
				message: `Data of student with id: ${ studentId } has been successfully found`,
				student,
			})
		} catch (err) {
			return response.status(err.status).json(err.response());
		}
	}

	@Put("/:id")
	async updateStudent(@Res() response, @Param("id") studentId: string, @Body() updateStudentDto: UpdateStudentDto) {
		try {
			const student = await this.studentService.updateStudent(studentId,  updateStudentDto);
			return response.status(HttpStatus.OK).json({
				message: `Data of student with id: ${ studentId } has been successfully updated`,
				student,
			})
		} catch (err) {
			return response.status(err.status).json(err.response());
		}
	}

	@Delete("/:id")
	async deleteStudent(@Res() response, @Param("id") studentId: string) {
		try {
			const student = await this.studentService.deleteStudent(studentId);
			return response.status(HttpStatus.OK).json({
				message: `Data of student with id: ${ studentId } has been successfully deleted`,
				student,
			})
		} catch(err) {
			return response.status(err.status).json(err.response());
		}
	}
}
