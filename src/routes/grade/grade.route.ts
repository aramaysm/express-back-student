import express from 'express';

// Controller
import gradeController from '../../controllers/grade.controller';


const router = express.Router();

router.get(
  '/',
  gradeController.list,
);

export default router;
