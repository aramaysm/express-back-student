

// Utilities

import ApiUtility from "../utilities/api.utility";

// Interfaces
import {
  
  IStudentQueryParams,
  
} from "../interfaces/student.interface";
import { IDeleteById, IDetailById } from "../interfaces/common.interface";

// Errors
import { myDataSource } from "../ormconfig";
import { Grade } from "../entities/grade.entity";

const where = { isDeleted: false };


const list = async (params: IStudentQueryParams) => {
 const grades = await myDataSource.getRepository(Grade).find({
    where: {
      isDeleted: false,
    },
  });

  const response = [];
  if (grades && grades.length) {
    for (const item of grades) {
      response.push(ApiUtility.sanitizeGrade(item));
    }
  }
  return { response };
};


export default {
 
  list,
 
};
