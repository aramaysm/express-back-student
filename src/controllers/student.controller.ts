import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '../interfaces/IController';
import {
    ICreateStudent,
  IUpdateStudent,
  IStudentQueryParams
} from '../interfaces/student.interface';
import { IDeleteById, IDetailById } from '../interfaces/common.interface';

// Errors
import { StringError } from '../errors/string.error';

// Services
import studentService from '../services/student.service';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';

// Constants
import constants from '../constants';

const create: IController = async (req, res) => {
  try {
    const params: ICreateStudent = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      grade: req.body.grade, 
    }
    const student = await studentService.create(params);
    return ApiResponse.result(res, student, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Email already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};


const detail: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: parseInt(req.params.id, 10),
    }
    const data = await studentService.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: parseInt(req.params.id),
      email: req.body.email,
      age: parseInt(req.params.id),
      grade: req.body.grade
    }

    await studentService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);

  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
   
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const params: IStudentQueryParams = { limit, page };
    const data = await studentService.list(params);
    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: parseInt(req.params.id),
    }
    await studentService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const removeMultiple: IController = async (req, res) => {
  try {
    const params: any = {
      ids: req.params.ids,
    }
    await studentService.removeMultiple(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default {
  create,
  detail,
  update,
  list,
  remove,
  removeMultiple
};
