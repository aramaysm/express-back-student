// Interfaces
import { Grade } from '../entities/grade.entity';
import { GradeEnum } from '../enums/grade.enum';
import { IBaseQueryParams } from './common.interface';

export interface ICreateStudent {  
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    grade: number,
}

export interface IUpdateStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string,
  age: number,
  grade: number,
}

export interface IStudentQueryParams extends IBaseQueryParams {
  keyword?: string;
}
