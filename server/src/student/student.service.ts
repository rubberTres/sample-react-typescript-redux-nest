import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IStudent } from "src/interface/student.interface";
import { CreateStudentDto } from "src/dto/create-student.dto";
import { UpdateStudentDto } from "src/dto/update-student.dto";

@Injectable()
export class StudentService {
	constructor(@InjectModel("Student") private studentModel: Model<IStudent>) {}

	//creating a new student inside mongodb
	async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
		const newStudent = await new this.studentModel(createStudentDto);
		return newStudent.save(); //save a new reference to the table
	}

	//reading all the students from mongodb
	async getAllStudents(): Promise<IStudent[]> {
		const studentData = await this.studentModel.find();
		if (!studentData || studentData.length === 0) {
			throw new NotFoundException("Student data not found");
		}
		return studentData;
	}

	//get a specific student by id
	async getStudent(studentId: string): Promise<IStudent> {
		const existingStudent = await this.studentModel.findById(studentId);
		if (!existingStudent) {
			throw new NotFoundException(`Student with id: ${ studentId } not found`);
		}
		return existingStudent;
	}

	//delete a student by id
	async deleteStudent(studentId: string): Promise<IStudent> {
		const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
		if (!deletedStudent) {
			throw new NotFoundException(`Student with id: ${ studentId } not found`);
		}
		return deletedStudent;
	}

	//update student by id
	async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
		const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
		if (!existingStudent) {
			throw new NotFoundException(`Student with id: ${ studentId } not found`);
		}
		return existingStudent;
	}
}
