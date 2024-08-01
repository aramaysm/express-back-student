import { In, Repository, getRepository } from "typeorm";

// Entities
import { Student } from "../entities/student.entity";

// Utilities

import ApiUtility from "../utilities/api.utility";
import DateTimeUtility from "../utilities/date-time.utility";

// Interfaces
import {
  ICreateStudent,
  IStudentQueryParams,
  IUpdateStudent,
} from "../interfaces/student.interface";
import { IDeleteById, IDetailById } from "../interfaces/common.interface";

// Errors
import { StringError } from "../errors/string.error";
import { myDataSource } from "../ormconfig";
import { GradeEnum } from "../enums/grade.enum";
import { Grade } from "../entities/grade.entity";

const where = { isDeleted: false };

const create = async (params: ICreateStudent) => {
  const query2 = { where: { ...where, id: params.grade } };

  const gradeFound = await myDataSource.getRepository(Grade).findOne(query2);
  if (!gradeFound) {
    throw new StringError("Grade is not existed");
  }

  const item = new Student();
  item.email = params.email;
  item.firstName = params.firstName;
  item.lastName = params.lastName;
  item.age = params.age;
  item.grade = gradeFound;

  const studentData = await myDataSource.getRepository(Student).save(item);

  return ApiUtility.sanitizeStudent(studentData);
};

const getById = async (params: IDetailById) => {
  try {
    const data = await myDataSource
      .getRepository(Student)
      .findOne({ where: { id: params.id } });
    return ApiUtility.sanitizeStudent(data);
  } catch (e) {
    return null;
  }
};

const detail = async (params: IDetailById) => {
  const query = {
    where: { ...where, id: params.id },
  };

  const user = await myDataSource.getRepository(Student).findOne(query);
  if (!user) {
    throw new StringError("Student is not existed");
  }

  return ApiUtility.sanitizeStudent(user);
};

const update = async (params: IUpdateStudent) => {
  const query = { where: { ...where, id: params.id } };

  const studFound = await myDataSource.getRepository(Student).findOne(query);
  if (!studFound) {
    throw new StringError("Student is not existed");
  }

  const query2 = { where: { ...where, id: params.grade } };

  const gradeFound = await myDataSource.getRepository(Grade).findOne(query2);
  if (!gradeFound) {
    throw new StringError("Grade is not existed");
  }

  const newStudent = new Student();
  newStudent.firstName = params.firstName;
  newStudent.lastName = params.lastName;
  newStudent.age = params.age;
  newStudent.grade = gradeFound;
  newStudent.email = params.email;
  newStudent.updatedAt = new Date(DateTimeUtility.getCurrentTimeStamp());

  console.log("Update", newStudent);

  return await myDataSource
    .getRepository(Student)
    .update(params.id, newStudent);
};

const list = async (params: IStudentQueryParams) => {
  const studts = await myDataSource.getRepository(Student).find({
    where: {
      isDeleted: false,
    },
    relations:[
      'grade'
    ]
  });

  const response = [];
  if (studts && studts.length) {
    for (const item of studts) {
      response.push(ApiUtility.sanitizeStudent(item));
    }
  }
  return { response };
};

const remove = async (params: IDeleteById) => {
  const query = { where: { ...where, id: params.id } };

  const user = await myDataSource.getRepository(Student).findOne(query);
  if (!user) {
    throw new StringError("Student is not existed");
  }

  return await myDataSource.getRepository(Student).update(user.id, {
    isDeleted: true,
    updatedAt: DateTimeUtility.getCurrentTimeStamp(),
  });
};

const removeMultiple = async (params: any) => {
  return await myDataSource.getRepository(Student).update(
    { id: In(params.ids) },
    {
      isDeleted: true,
      updatedAt: DateTimeUtility.getCurrentTimeStamp(),
    }
  );
};

export default {
  create,
  getById,
  detail,
  update,
  list,
  remove,
  removeMultiple,
};
