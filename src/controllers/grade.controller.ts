import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../interfaces/IController';
import {
    ICreateStudent,
  IUpdateStudent,
  IStudentQueryParams
} from '../interfaces/student.interface';


// Services
import gradeService from '../services/grade.service';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';




const list: IController = async (req, res) => {
  try {
   
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const params: IStudentQueryParams = { limit, page };
    const data = await gradeService.list(params);
    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default {
 
  list,
  
};
